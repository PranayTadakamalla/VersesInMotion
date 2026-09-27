"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { noise } from "./glsl";
import { fragments } from "@/lib/poems";

const MOON = new THREE.Vector3(-6, 16, -130);
const MOON_DIR = MOON.clone().normalize();

/* ──────────────────────────────────────────── sky dome */
function Sky() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uMoonDir: { value: MOON_DIR } },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main(){
            vDir = normalize((modelMatrix * vec4(position,1.0)).xyz);
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
          }`,
        fragmentShader: /* glsl */ `
          ${noise}
          uniform float uTime; uniform vec3 uMoonDir;
          varying vec3 vDir;
          void main(){
            float y = vDir.y;
            vec3 zenith = vec3(0.0015,0.0018,0.006);
            vec3 mid = vec3(0.006,0.007,0.025);
            vec3 horizon = vec3(0.05,0.014,0.03);
            vec3 col = mix(horizon, mid, smoothstep(-0.02, 0.18, y));
            col = mix(col, zenith, smoothstep(0.18, 0.75, y));
            // a faint river of stars across the sky
            vec2 q = vDir.xz / (abs(y) + 0.35) * 1.2;
            float band = exp(-pow((y - 0.4 + 0.15*vDir.x) * 3.0, 2.0));
            float neb = fbm(q + vec2(uTime*0.004, 0.0));
            col += band * smoothstep(-0.2, 0.8, neb) * vec3(0.012,0.008,0.022);
            // moon glow bleeding into the sky
            float m = max(dot(vDir, uMoonDir), 0.0);
            col += vec3(0.95,0.85,0.7) * pow(m, 90.0) * 0.35;
            col += vec3(0.35,0.16,0.2) * pow(m, 8.0) * 0.06;
            gl_FragColor = vec4(col, 1.0);
          }`,
      }),
    [],
  );
  useFrame((_, dt) => (mat.uniforms.uTime.value += dt));
  return (
    <mesh material={mat} renderOrder={-2}>
      <sphereGeometry args={[400, 48, 32]} />
    </mesh>
  );
}

/* ──────────────────────────────────────────── stars */
function Stars({ count }: { count: number }) {
  const [geo, mat] = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.94 + 0.03); // upper hemisphere only
      const r = 300;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) + 4;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      seed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSeed; uniform float uTime; uniform float uPx;
        varying float vA; varying vec3 vC;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_Position = projectionMatrix * mv;
          float tw = 0.55 + 0.45*sin(uTime*(0.6+aSeed*2.4) + aSeed*40.0);
          vA = tw * (0.35 + aSeed*0.65);
          vC = mix(vec3(0.75,0.82,1.0), vec3(1.0,0.86,0.7), step(0.7, aSeed));
          gl_PointSize = (1.0 + pow(aSeed, 6.0) * 3.5) * uPx;
        }`,
      fragmentShader: /* glsl */ `
        varying float vA; varying vec3 vC;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vC * 1.6, a * vA);
        }`,
    });
    return [g, m];
  }, [count]);
  const { gl } = useThree();
  useEffect(() => {
    mat.uniforms.uPx.value = gl.getPixelRatio();
  }, [gl, mat]);
  useFrame((_, dt) => (mat.uniforms.uTime.value += dt));
  return <points geometry={geo} material={mat} renderOrder={-1} />;
}

/* ──────────────────────────────────────────── the moon */
function Moon() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec3 vN; varying vec3 vP; varying vec3 vView;
          void main(){
            vN = normalize(normalMatrix * normal);
            vP = position;
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          ${noise}
          varying vec3 vN; varying vec3 vP; varying vec3 vView;
          void main(){
            vec3 p = normalize(vP);
            vec2 uv = vec2(atan(p.z, p.x), asin(p.y));
            float maria = fbm(uv * 1.6 + 3.0);
            float craters = fbm(uv * 7.0);
            vec3 base = vec3(1.0, 0.97, 0.9);
            base *= 0.86 + 0.14 * smoothstep(-0.3, 0.4, maria);
            base *= 0.94 + 0.06 * craters;
            float limb = pow(max(dot(vN, vView), 0.0), 0.45);
            gl_FragColor = vec4(base * (0.55 + 0.9 * limb) * 1.25, 1.0);
          }`,
      }),
    [],
  );
  const halo = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv; uniform float uTime;
          void main(){
            float d = length(vUv - 0.5) * 2.0;
            float g = pow(max(1.0 - d, 0.0), 3.0) * 0.55 + pow(max(1.0 - d, 0.0), 12.0) * 0.8;
            g *= 0.92 + 0.08 * sin(uTime * 0.7);
            gl_FragColor = vec4(vec3(1.0, 0.9, 0.78) * g, g);
          }`,
      }),
    [],
  );
  useFrame((_, dt) => (halo.uniforms.uTime.value += dt));
  return (
    <group position={MOON}>
      <mesh material={mat}>
        <sphereGeometry args={[9, 64, 64]} />
      </mesh>
      <mesh material={halo} position={[0, 0, -1]}>
        <planeGeometry args={[90, 90]} />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────── the sea */
function Sea({ segments }: { segments: number }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uMoon: { value: MOON } },
        vertexShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vWorld; varying vec3 vNormal;
          float wave(vec2 p, vec2 d, float f, float a, float s){ return a * sin(dot(p, normalize(d)) * f + uTime * s); }
          float height(vec2 p){
            return wave(p, vec2(1.0,0.3), 0.18, 0.32, 0.9)
                 + wave(p, vec2(-0.6,1.0), 0.31, 0.18, 1.3)
                 + wave(p, vec2(0.2,-1.0), 0.57, 0.08, 1.9)
                 + wave(p, vec2(-1.0,-0.4), 1.13, 0.035, 2.7);
          }
          void main(){
            vec3 p = (modelMatrix * vec4(position,1.0)).xyz;
            float e = 0.2;
            float h = height(p.xz);
            float hx = height(p.xz + vec2(e,0.0));
            float hz = height(p.xz + vec2(0.0,e));
            p.y += h;
            vNormal = normalize(vec3(h - hx, e, h - hz));
            vWorld = p;
            gl_Position = projectionMatrix * viewMatrix * vec4(p,1.0);
          }`,
        fragmentShader: /* glsl */ `
          ${noise}
          uniform float uTime; uniform vec3 uMoon;
          varying vec3 vWorld; varying vec3 vNormal;
          void main(){
            vec3 N = normalize(vNormal + vec3(snoise(vWorld.xz*0.9 + uTime*0.25)*0.06, 0.0, snoise(vWorld.zx*0.9 - uTime*0.2)*0.06));
            vec3 V = normalize(cameraPosition - vWorld);
            vec3 L = normalize(uMoon - vWorld);
            vec3 R = reflect(-V, N);
            float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
            vec3 deep = vec3(0.0006, 0.001, 0.004);
            vec3 skyRef = mix(vec3(0.005,0.006,0.02), vec3(0.05,0.014,0.03), fres);
            vec3 col = mix(deep, skyRef, 0.25 + fres * 0.75);
            float s = max(dot(R, L), 0.0);
            float glitter = step(0.72, hash(floor(vWorld.xz * 6.0) + floor(uTime * 3.0)));
            col += vec3(1.0,0.92,0.78) * (pow(s, 900.0) * 9.0 + pow(s, 120.0) * 1.2 * (0.4 + glitter));
            col += vec3(0.9,0.6,0.55) * pow(s, 18.0) * 0.03;
            // melt into the horizon haze
            float dist = length(vWorld.xz - cameraPosition.xz);
            col = mix(col, vec3(0.05,0.014,0.03), smoothstep(40.0, 190.0, dist));
            gl_FragColor = vec4(col, 1.0);
          }`,
      }),
    [],
  );
  useFrame((_, dt) => (mat.uniforms.uTime.value += dt));
  return (
    <mesh material={mat} rotation-x={-Math.PI / 2} position={[0, -1.2, -80]}>
      <planeGeometry args={[420, 260, segments, segments]} />
    </mesh>
  );
}

/* ──────────────────────────────────────────── embers rising */
function Embers({ count }: { count: number }) {
  const [geo, mat] = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 14;
      pos[i * 3 + 2] = -Math.random() * 40 + 6;
      seed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSeed; uniform float uTime; uniform float uPx; varying float vA; varying float vS;
        void main(){
          vec3 p = position;
          float t = uTime * (0.12 + aSeed * 0.25);
          p.y = mod(p.y + t * 3.0, 14.0) - 1.0;
          p.x += sin(t * 2.0 + aSeed * 30.0) * 0.8;
          p.z += cos(t * 1.6 + aSeed * 12.0) * 0.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          vA = smoothstep(-1.0, 1.5, p.y) * smoothstep(13.0, 8.0, p.y);
          vS = aSeed;
          gl_PointSize = (18.0 + aSeed * 36.0) * uPx / -mv.z;
        }`,
      fragmentShader: /* glsl */ `
        varying float vA; varying float vS;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 c = mix(vec3(1.0,0.55,0.35), vec3(1.0,0.85,0.6), vS);
          gl_FragColor = vec4(c, a * vA * 0.75);
        }`,
    });
    return [g, m];
  }, [count]);
  const { gl } = useThree();
  useEffect(() => {
    mat.uniforms.uPx.value = gl.getPixelRatio();
  }, [gl, mat]);
  useFrame((_, dt) => (mat.uniforms.uTime.value += dt));
  return <points geometry={geo} material={mat} />;
}

/* ──────────────────────────────────────────── a wish crossing the sky */
function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const state = useRef({ t: -3, from: new THREE.Vector3(), dir: new THREE.Vector3() });
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uA: { value: 0 } },
        vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv; uniform float uA;
          void main(){
            float head = pow(vUv.x, 6.0);
            float w = 1.0 - abs(vUv.y - 0.5) * 2.0;
            gl_FragColor = vec4(vec3(1.0,0.95,0.85), head * w * uA);
          }`,
      }),
    [],
  );
  useFrame((_, dt) => {
    const s = state.current;
    const m = ref.current;
    if (!m) return;
    s.t += dt;
    if (s.t > 1.4) {
      // wait a while, then fall again somewhere new
      s.t = -(4 + Math.random() * 9);
      s.from.set(-40 + Math.random() * 80, 40 + Math.random() * 25, -150);
      s.dir.set(Math.random() > 0.5 ? 1 : -1, -0.45, 0).normalize();
      m.rotation.z = Math.atan2(s.dir.y, s.dir.x);
    }
    const t = Math.max(s.t, 0);
    m.position.copy(s.from).addScaledVector(s.dir, t * 90);
    mat.uniforms.uA.value = s.t < 0 ? 0 : Math.sin((t / 1.4) * Math.PI);
  });
  return (
    <mesh ref={ref} material={mat}>
      <planeGeometry args={[22, 0.35]} />
    </mesh>
  );
}

/* ──────────────────────────────────────────── verses adrift */
function useVerseTextures() {
  const [textures, setTextures] = useState<{ tex: THREE.CanvasTexture; aspect: number; slug: string }[]>([]);
  useEffect(() => {
    let cancelled = false;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-cormorant").trim() || "serif";
    const font = `italic 300 72px ${family}`;
    document.fonts
      .load(font)
      .catch(() => [])
      .then(() => {
      if (cancelled) return;
      const made = fragments.map(({ line, slug }) => {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d")!;
        ctx.font = font;
        const w = Math.ceil(ctx.measureText(line).width) + 80;
        c.width = w;
        c.height = 130;
        ctx.font = font;
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(255,220,170,0.7)";
        ctx.shadowBlur = 18;
        ctx.fillStyle = "rgba(246,238,219,0.95)";
        ctx.fillText(line, 40, 66);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        return { tex, aspect: w / 130, slug };
      });
      setTextures(made);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return textures;
}

function Verses() {
  const textures = useVerseTextures();
  const router = useRouter();
  useEffect(() => () => void window.dispatchEvent(new CustomEvent("cursor-label", { detail: "" })), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const hovered = useRef<number | null>(null);
  const seeds = useMemo(
    () =>
      fragments.map((_, i) => ({
        x: ((i * 7.31) % 1) * 30 - 15,
        y: ((i * 3.77) % 1) * 11,
        z: -4 - ((i * 5.13) % 1) * 30,
        speed: 0.18 + ((i * 2.9) % 1) * 0.22,
        phase: i * 1.7,
      })),
    [],
  );

  useFrame((state, dt) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const s = seeds[i];
      s.y += s.speed * dt;
      if (s.y > 12) {
        s.y = -1;
        s.x = Math.random() * 30 - 15;
      }
      m.position.set(s.x + Math.sin(state.clock.elapsedTime * 0.2 + s.phase) * 0.8, s.y, s.z);
      m.rotation.y = Math.sin(state.clock.elapsedTime * 0.15 + s.phase) * 0.25;
      m.rotation.z = Math.sin(state.clock.elapsedTime * 0.1 + s.phase) * 0.04;
      const mat = m.material as THREE.MeshBasicMaterial;
      const fade = THREE.MathUtils.smoothstep(s.y, -1, 1.5) * (1 - THREE.MathUtils.smoothstep(s.y, 9, 12));
      const target = (hovered.current === i ? 1 : 0.7) * fade;
      mat.opacity += (target - mat.opacity) * 0.08;
      const sc = hovered.current === i ? 1.08 : 1;
      m.scale.x += (sc - m.scale.x) * 0.1;
      m.scale.y = m.scale.x;
    });
  });

  return (
    <group>
      {textures.map(({ tex, aspect, slug }, i) => (
        <mesh
          key={slug + i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            hovered.current = i;
            window.dispatchEvent(new CustomEvent("cursor-label", { detail: "read" }));
          }}
          onPointerOut={() => {
            hovered.current = null;
            window.dispatchEvent(new CustomEvent("cursor-label", { detail: "" }));
          }}
          onClick={() => router.push(`/poems/${slug}`)}
        >
          <planeGeometry args={[aspect * 0.7, 0.7]} />
          <meshBasicMaterial map={tex} transparent opacity={0} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────── camera choreography */
function Rig({ intro }: { intro: boolean }) {
  const { camera, pointer, size } = useThree();
  const t0 = useRef<number | null>(null);
  useFrame((state) => {
    if (intro && t0.current === null) t0.current = state.clock.elapsedTime;
    const k = t0.current === null ? 0 : Math.min((state.clock.elapsedTime - t0.current) / 4, 1);
    const ease = 1 - Math.pow(1 - k, 3);
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    const tx = pointer.x * 1.4;
    const ty = 2.2 + pointer.y * 0.6 + scroll * 2.5 + (1 - ease) * 6;
    const tz = 14 - ease * 2 - scroll * 6;
    camera.position.x += (tx - camera.position.x) * 0.03;
    camera.position.y += (ty - camera.position.y) * 0.03;
    camera.position.z += (tz - camera.position.z) * 0.03;
    // on tall screens look further down the sea so the moon rises above the title
    const base = size.width / size.height < 0.8 ? -12 : 6;
    camera.lookAt(pointer.x * 2, base + scroll * 4 + (1 - ease) * 4, -60);
  });
  return null;
}

export default function HeroScene({
  intro,
  eventSource,
}: {
  intro: boolean;
  eventSource: React.RefObject<HTMLElement | null>;
}) {
  const [mobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  return (
    <Canvas
      eventSource={eventSource as React.RefObject<HTMLElement>}
      eventPrefix="client"
      dpr={[1, mobile ? 1.5 : 1.75]}
      camera={{ position: [0, 8, 14], fov: 50, near: 0.1, far: 1000 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#020206"]} />
      <Sky />
      <Stars count={mobile ? 1400 : 3200} />
      <Moon />
      <ShootingStar />
      <Sea segments={mobile ? 140 : 260} />
      <Embers count={mobile ? 90 : 220} />
      <Verses />
      <Rig intro={intro} />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.55} luminanceSmoothing={0.2} radius={0.8} />
        <Vignette offset={0.25} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
