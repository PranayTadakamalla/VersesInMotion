"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, CameraControlsImpl, Html, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { chapters, poems, firstLine, type ChapterSlug, type Poem } from "@/lib/poems";

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

type Star = { poem: Poem; pos: THREE.Vector3; color: THREE.Color; size: number };

export function useSkyLayout() {
  return useMemo(() => {
    const centres = new Map<ChapterSlug, THREE.Vector3>();
    chapters.forEach((c, i) => {
      const a = (i / chapters.length) * Math.PI * 2;
      centres.set(c.slug, new THREE.Vector3(Math.cos(a) * 15, Math.sin(i * 1.9) * 3.5, Math.sin(a) * 15));
    });
    const rand = rng(221);
    const stars: Star[] = poems.map((poem) => {
      const c = centres.get(poem.chapter)!;
      const chapter = chapters.find((x) => x.slug === poem.chapter)!;
      const r = 1.2 + rand() * 3.4;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(rand() * 2 - 1);
      const pos = new THREE.Vector3(
        c.x + r * Math.sin(ph) * Math.cos(th),
        c.y + r * Math.cos(ph) * 0.8,
        c.z + r * Math.sin(ph) * Math.sin(th),
      );
      const lines = poem.text.split("\n").filter(Boolean).length;
      return { poem, pos, color: new THREE.Color(chapter.palette[0]), size: 0.28 + Math.min(lines, 40) * 0.012 };
    });
    return { centres, stars };
  }, []);
}

function Glow({ star, onHover, active }: { star: Star; onHover: (s: Star | null) => void; active: boolean }) {
  const router = useRouter();
  const ref = useRef<THREE.Sprite>(null);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.12, "rgba(255,255,255,0.9)");
    g.addColorStop(0.3, "rgba(255,255,255,0.25)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  const phase = useMemo(() => Math.random() * 10, []);
  useFrame((state) => {
    if (!ref.current) return;
    const tw = 1 + Math.sin(state.clock.elapsedTime * 1.3 + phase) * 0.12;
    const target = star.size * (active ? 2.2 : 1) * tw * 2.4;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.12;
    ref.current.scale.set(s, s, 1);
  });
  return (
    <sprite
      ref={ref}
      position={star.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(star);
      }}
      onPointerOut={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/poems/${star.poem.slug}`);
      }}
    >
      <spriteMaterial
        map={tex}
        color={star.color.clone().multiplyScalar(active ? 2.2 : 1.5)}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
}

function Dust() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 2600;
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 60 + Math.random() * 140;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      p.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.004;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.35} color="#c9c6d8" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

type Zoom = { n: number; dir: 1 | -1 };

function Scene({
  focus,
  zoom,
  onHover,
  hovered,
}: {
  focus: ChapterSlug | null;
  zoom: Zoom;
  onHover: (s: Star | null) => void;
  hovered: Star | null;
}) {
  const { centres, stars } = useSkyLayout();
  const controls = useRef<CameraControls>(null);
  const { size } = useThree();

  // the wheel belongs to the page; zoom lives on buttons and pinches
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const A = CameraControlsImpl.ACTION;
    c.mouseButtons.wheel = A.NONE;
    c.mouseButtons.right = A.NONE;
    c.touches.one = A.TOUCH_ROTATE;
    c.touches.two = A.TOUCH_DOLLY;
    c.touches.three = A.NONE;
  }, []);

  useEffect(() => {
    if (zoom.n > 0) void controls.current?.dolly(zoom.dir * 7, true);
  }, [zoom]);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const far = size.width < 700 ? 1.45 : 1;
    if (focus) {
      const t = centres.get(focus)!;
      const eye = t.clone().multiplyScalar(1.9).add(new THREE.Vector3(0, 3, 0));
      void c.setLookAt(eye.x, eye.y, eye.z, t.x, t.y, t.z, true);
    } else {
      void c.setLookAt(0, 16 * far, 38 * far, 0, 0, 0, true);
    }
  }, [focus, centres, size.width]);

  useFrame((_, dt) => {
    if (!focus && !hovered && controls.current) controls.current.azimuthAngle += dt * 0.03;
  });

  return (
    <>
      <color attach="background" args={["#04040a"]} />
      <fog attach="fog" args={["#04040a", 40, 160]} />
      <Dust />
      {chapters.map((c) => {
        const list = stars.filter((s) => s.poem.chapter === c.slug);
        const centre = centres.get(c.slug)!;
        const dim = focus && focus !== c.slug;
        return (
          <group key={c.slug}>
            {list.length > 1 && (
              <Line
                points={list.map((s) => s.pos)}
                color={c.palette[0]}
                lineWidth={0.8}
                transparent
                opacity={dim ? 0.06 : 0.28}
              />
            )}
            <Html position={[centre.x, centre.y + 5, centre.z]} center distanceFactor={22} zIndexRange={[10, 0]}>
              <div className="pointer-events-none select-none text-center" style={{ opacity: dim ? 0.25 : 1, transition: "opacity .6s" }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: c.palette[0] }}>
                  {c.numeral}
                </p>
                <p className="whitespace-nowrap font-display text-3xl italic text-bone">{c.title}</p>
              </div>
            </Html>
          </group>
        );
      })}
      {stars.map((s) => (
        <Glow key={s.poem.slug} star={s} onHover={onHover} active={hovered?.poem.slug === s.poem.slug} />
      ))}
      {hovered && (
        <Html position={hovered.pos} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div className="ml-6 w-64 -translate-y-1/2 rounded-sm border border-bone/15 bg-ink/80 p-4 backdrop-blur-md">
            <p className="label mb-2 !text-[0.6rem]" style={{ color: hovered.color.getStyle() }}>
              {hovered.poem.language}
              {hovered.poem.unfinished ? " · unfinished" : ""}
            </p>
            <p className={`text-xl leading-tight text-bone ${hovered.poem.script === "telugu" ? "script-telugu !leading-snug" : "font-display"}`}>
              {hovered.poem.title}
            </p>
            <p className={`mt-2 text-sm text-bone/60 ${hovered.poem.script === "devanagari" ? "script-devanagari" : hovered.poem.script === "telugu" ? "script-telugu" : "italic-serif"}`}>
              {firstLine(hovered.poem)}
            </p>
          </div>
        </Html>
      )}
      <CameraControls
        ref={controls}
        minDistance={6}
        maxDistance={80}
        dollySpeed={0.4}
        smoothTime={0.9}
        truckSpeed={0}
      />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.3} luminanceThreshold={0.2} radius={0.7} />
      </EffectComposer>
    </>
  );
}

export default function Constellation({ focus, zoom }: { focus: ChapterSlug | null; zoom: Zoom }) {
  const [hovered, setHovered] = useState<Star | null>(null);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("cursor-label", { detail: hovered ? "read" : "" }));
  }, [hovered]);
  useEffect(() => () => void window.dispatchEvent(new CustomEvent("cursor-label", { detail: "" })), []);
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 30, 70], fov: 45 }} gl={{ antialias: true }}>
      <Scene focus={focus} zoom={zoom} onHover={setHovered} hovered={hovered} />
    </Canvas>
  );
}
