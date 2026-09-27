"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { noise } from "./glsl";

/**
 * Slow, domain-warped ink clouds in a chapter's colours — the page
 * breathes behind the poem like smoke in a dark room.
 */
function Ink({ palette, intensity }: { palette: [string, string, string]; intensity: number }) {
  const { size, viewport } = useThree();
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(1, 1) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uScroll: { value: 0 },
          uA: { value: new THREE.Color(palette[0]) },
          uB: { value: new THREE.Color(palette[1]) },
          uC: { value: new THREE.Color(palette[2]) },
          uI: { value: intensity },
        },
        vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
        fragmentShader: /* glsl */ `
          ${noise}
          uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uScroll;
          uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uI;
          varying vec2 vUv;
          void main(){
            vec2 uv = vUv;
            vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 1.1;
            float t = uTime * 0.03;
            p.y += uScroll * 0.5;
            vec2 m = (uMouse - 0.5) * 0.4;
            vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
            vec2 r = vec2(fbm(p + 1.6 * q + vec2(1.7, 9.2) + m + t * 1.2), fbm(p + 1.6 * q + vec2(8.3, 2.8) - t));
            float f = fbm(p + 1.4 * r);
            float v = clamp(f * 0.5 + 0.5, 0.0, 1.0);
            vec3 col = uC * 0.5;
            col = mix(col, uB * 0.4, smoothstep(0.3, 0.95, v) * uI);
            col = mix(col, uA * 0.42, smoothstep(0.5, 1.15, v * (0.6 + length(r) * 0.6)) * uI * 0.7);
            // keep a quiet column of darkness where the words live
            col *= 1.0 - 0.35 * smoothstep(0.45, 0.0, abs(uv.x - 0.42));
            // slow motes of light, drifting upward
            vec2 g = vec2(uv.x * uRes.x / uRes.y, uv.y - uTime * 0.01) * 22.0;
            vec2 cell = floor(g);
            vec2 f2 = fract(g) - 0.5 - (vec2(hash(cell), hash(cell + 7.0)) - 0.5) * 0.6;
            float on = step(0.93, hash(cell + 13.0));
            float mote = on * smoothstep(0.08, 0.0, length(f2)) * (0.5 + 0.5 * sin(uTime * 1.3 + hash(cell) * 40.0));
            col += uA * mote * 0.35;
            float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.3, 1.0)));
            col *= 0.35 + 0.65 * vig;
            gl_FragColor = vec4(col, 1.0);
          }`,
      }),
    // palette is fixed per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    mat.uniforms.uA.value.set(palette[0]);
    mat.uniforms.uB.value.set(palette[1]);
    mat.uniforms.uC.value.set(palette[2]);
    mat.uniforms.uI.value = intensity;
  }, [palette, intensity, mat]);

  useFrame((state, dt) => {
    mat.uniforms.uTime.value += dt;
    mat.uniforms.uRes.value.set(size.width, size.height);
    const mouse = mat.uniforms.uMouse.value as THREE.Vector2;
    mouse.lerp(new THREE.Vector2(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5), 0.03);
    const s = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    mat.uniforms.uScroll.value += (s - mat.uniforms.uScroll.value) * 0.05;
  });

  return (
    <mesh material={mat} scale={[viewport.width, viewport.height, 1]} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

export default function InkSky({
  palette,
  intensity = 1,
  className = "fixed inset-0 -z-10",
}: {
  palette: [string, string, string];
  intensity?: number;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <Canvas dpr={[0.75, 1]} gl={{ antialias: false, powerPreference: "low-power" }} eventSource={typeof document !== "undefined" ? document.body : undefined} eventPrefix="client">
        <Ink palette={palette} intensity={intensity} />
      </Canvas>
    </div>
  );
}
