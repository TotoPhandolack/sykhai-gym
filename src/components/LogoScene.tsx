"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import type { Group } from "three";

function LogoModel() {
  const groupRef = useRef<Group>(null);
  const gltf = useLoader(GLTFLoader, "/models/sykhai-logo.glb", (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.35;
    }
  });

  return <primitive ref={groupRef} object={gltf.scene} />;
}

export default function LogoScene({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 3], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#ffd400" />
      <Suspense fallback={null}>
        <LogoModel />
      </Suspense>
    </Canvas>
  );
}
