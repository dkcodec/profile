"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Float,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import type { Group } from "three";

const MODEL_PATH = "/models/commodore_64__computer_full_pack.glb";
const DRACO_PATH = "/draco/";

function Model() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH, DRACO_PATH);
  const { viewport } = useThree();

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const scale = 0.5;
  const posX = viewport.width * 0.15;

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    current.current.x += (mouse.current.x - current.current.x) * 0.04;
    current.current.y += (mouse.current.y - current.current.y) * 0.04;
    groupRef.current.rotation.y = -0.4 + current.current.x * 0.4;
    groupRef.current.rotation.x = current.current.y * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0}>
      <group
        ref={groupRef}
        scale={scale}
        position={[posX, -viewport.height * 0.08, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

export function HeroModel() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop check already handled by parent (HeroSection only imports this on md+)
  // Just use IntersectionObserver to defer Canvas mount until hero is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      {shouldRender && (
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop="always"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Suspense fallback={null}>
            <Environment files="/environment.hdr" />
            <Model />
            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.3}
              scale={8}
              blur={2}
              far={3}
              color="#000000"
            />
          </Suspense>
          <OrbitControls
            target={[0, 0, 0]}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            dampingFactor={0.08}
            enableDamping
          />
        </Canvas>
      )}
    </div>
  );
}
