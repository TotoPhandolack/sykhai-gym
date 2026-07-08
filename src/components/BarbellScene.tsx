"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";

function Barbell() {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();
  const scale = Math.min(0.85, viewport.width / 7);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    // Oscillate near the side-on view; never swing close to 90deg,
    // where the bar foreshortens to a point and the plates overlap into a blob.
    group.rotation.y = Math.sin(t * 0.3) * 0.6;
    group.rotation.x = 0.15 + Math.sin(t * 0.5) * 0.05;
  });

  const barMaterial = { color: "#9a9a9a", metalness: 0.6, roughness: 0.35 };
  const collarMaterial = { color: "#707070", metalness: 0.7, roughness: 0.3 };
  const plateMaterial = { color: "#ffd400", metalness: 0.2, roughness: 0.55 };

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.11, 0.11, 5.2, 24]} />
        <meshStandardMaterial {...barMaterial} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.1, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[side * -0.25, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.18, 24]} />
            <meshStandardMaterial {...collarMaterial} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.05, 0, 0]}>
            <cylinderGeometry args={[0.85, 0.85, 0.22, 32]} />
            <meshStandardMaterial {...plateMaterial} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.32, 0, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.18, 32]} />
            <meshStandardMaterial {...plateMaterial} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function BarbellScene({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -4]} intensity={0.25} color="#ffd400" />
      <pointLight position={[0, 1, 6]} intensity={0.5} />
      <Barbell />
    </Canvas>
  );
}
