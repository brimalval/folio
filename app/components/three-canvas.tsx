"use client";

import { useRef, useState, useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MOBILE_PARTICLE_COUNT = 150;
const DESKTOP_PARTICLE_COUNT = 180;
const CURSOR_REPULSION_RADIUS = 1.5;
const CURSOR_REPULSION_STRENGTH = 0.65;
const CURSOR_INTENSITY_EASE = 0.08;
const PARTICLE_EASE = 0.12;

type CursorState = {
  x: number;
  y: number;
  active: boolean;
  intensity: number;
};

const colorPalette = [
  new THREE.Color("#c4a7e7"),
  new THREE.Color("#9ccfd8"),
  new THREE.Color("#ebbcba"),
];

function createParticleData(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return { positions, colors };
}

const mobileParticleData = createParticleData(MOBILE_PARTICLE_COUNT);
const desktopParticleData = createParticleData(DESKTOP_PARTICLE_COUNT);

function ParticleField({
  cursorRef,
  reducedMotion,
}: {
  cursorRef: MutableRefObject<CursorState>;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsAttributeRef = useRef<THREE.BufferAttribute | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleData = isMobile ? mobileParticleData : desktopParticleData;
  const restPositionsRef = useRef<Float32Array>(
    new Float32Array(particleData.positions),
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current || !positionsAttributeRef.current) return;
    const points = pointsRef.current;
    const positions = positionsAttributeRef.current.array as Float32Array;
    const restPositions = restPositionsRef.current;
    const cursor = cursorRef.current;

    if (reducedMotion) {
      cursor.active = false;
      cursor.intensity = 0;
      cursor.x = 0;
      cursor.y = 0;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = restPositions[i];
        positions[i + 1] = restPositions[i + 1];
        positions[i + 2] = restPositions[i + 2];
      }

      points.rotation.set(0, 0, 0);
      positionsAttributeRef.current.needsUpdate = true;
      return;
    }

    points.rotation.y = clock.elapsedTime * 0.015;
    points.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;

    const targetIntensity = !cursor.active ? 0 : 1;
    cursor.intensity += (targetIntensity - cursor.intensity) * CURSOR_INTENSITY_EASE;

    const influence = cursor.intensity;
    const hasInfluence = influence > 0.001;
    const cursorWorldX = cursor.x * 6;
    const cursorWorldY = cursor.y * 4;
    const radiusSq = CURSOR_REPULSION_RADIUS * CURSOR_REPULSION_RADIUS;

    for (let i = 0; i < positions.length; i += 3) {
      const restX = restPositions[i];
      const restY = restPositions[i + 1];
      const restZ = restPositions[i + 2];
      let targetX = restX;
      let targetY = restY;

      if (hasInfluence) {
        const dx = restX - cursorWorldX;
        const dy = restY - cursorWorldY;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq) {
          const distance = Math.sqrt(distSq);
          const safeDistance = distance || 0.0001;
          const falloff = 1 - distance / CURSOR_REPULSION_RADIUS;
          const repulsion = CURSOR_REPULSION_STRENGTH * falloff * influence;
          targetX = restX + (dx / safeDistance) * repulsion;
          targetY = restY + (dy / safeDistance) * repulsion;
        }
      }

      positions[i] += (targetX - positions[i]) * PARTICLE_EASE;
      positions[i + 1] += (targetY - positions[i + 1]) * PARTICLE_EASE;
      positions[i + 2] += (restZ - positions[i + 2]) * PARTICLE_EASE;
    }

    positionsAttributeRef.current.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={positionsAttributeRef}
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeCanvas() {
  const prefersReducedMotion = false;
  const cursorRef = useRef<CursorState>({
    x: 0,
    y: 0,
    active: false,
    intensity: 0,
  });

  useEffect(() => {
    const updateCursor = (clientX: number, clientY: number) => {
      const cursor = cursorRef.current;
      cursor.x = (clientX / window.innerWidth) * 2 - 1;
      cursor.y = -(clientY / window.innerHeight) * 2 + 1;
      cursor.active = true;
    };

    const handleMouseMove = (event: MouseEvent) =>
      updateCursor(event.clientX, event.clientY);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateCursor(touch.clientX, touch.clientY);
    };
    const handleCursorInactive = () => {
      const cursor = cursorRef.current;
      cursor.active = false;
      cursor.intensity = 0;
    };
    const handleVisibilityChange = () => {
      if (document.hidden) handleCursorInactive();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleCursorInactive, { passive: true });
    window.addEventListener("mouseleave", handleCursorInactive);
    window.addEventListener("blur", handleCursorInactive);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleCursorInactive);
      window.removeEventListener("mouseleave", handleCursorInactive);
      window.removeEventListener("blur", handleCursorInactive);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      handleCursorInactive();
    };
  }, []);

  return (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={1}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        className="opacity-60 pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
      <ParticleField cursorRef={cursorRef} reducedMotion={prefersReducedMotion} />
    </Canvas>
  );
}
