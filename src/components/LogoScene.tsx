"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { AdditiveBlending, type Group, type Points } from "three";

const DRAG_SENSITIVITY = 0.008;
const PARTICLE_COUNT = 160;
const PARTICLE_BOUNDS = { x: 3, y: 2.4, z: 1.5 };

// Generated once at module load so render stays pure
const PARTICLE_DATA = (() => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const speeds = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * PARTICLE_BOUNDS.x * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * PARTICLE_BOUNDS.y * 2;
    // Bias motes slightly behind the logo so they don't sit on top of it
    positions[i * 3 + 2] = (Math.random() - 0.5) * PARTICLE_BOUNDS.z * 2 - 0.5;
    speeds[i] = 0.05 + Math.random() * 0.15;
  }
  return { positions, speeds };
})();

type DragState = {
  active: boolean;
  lastX: number;
  velocity: number;
  offset: number;
  sway: number;
};

function Particles() {
  const pointsRef = useRef<Points>(null);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const position = points.geometry.attributes.position;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let y = position.getY(i) + PARTICLE_DATA.speeds[i] * delta;
      if (y > PARTICLE_BOUNDS.y) y = -PARTICLE_BOUNDS.y;
      position.setY(i, y);
    }
    position.needsUpdate = true;
    points.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_DATA.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffd400"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function LogoModel() {
  const groupRef = useRef<Group>(null);
  const dragRef = useRef<DragState>({
    active: false,
    lastX: 0,
    velocity: 0,
    offset: 0,
    sway: 1,
  });
  const gl = useThree((state) => state.gl);
  const gltf = useLoader(GLTFLoader, "/models/sykhai-logo.glb", (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  // Drag / touch to spin the logo
  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      dragRef.current.active = true;
      dragRef.current.lastX = e.clientX;
      dragRef.current.velocity = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      d.offset += dx * DRAG_SENSITIVITY;
      d.velocity = dx * DRAG_SENSITIVITY;
    };
    const endDrag = () => {
      dragRef.current.active = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const d = dragRef.current;

    if (d.active) {
      // Bleed off velocity while the finger is held still so releasing
      // after a pause doesn't fling the logo
      d.velocity *= Math.pow(0.8, delta * 60);
    } else {
      // Inertia after release, then ease back to face front
      d.offset += d.velocity * delta * 60;
      d.velocity *= Math.pow(0.94, delta * 60);
      if (Math.abs(d.velocity) < 0.002) {
        const rest = Math.round(d.offset / (Math.PI * 2)) * (Math.PI * 2);
        d.offset += (rest - d.offset) * Math.min(1, delta * 2);
      }
    }

    // Idle sway fades out while the user is interacting
    const swayTarget = d.active || Math.abs(d.velocity) > 0.002 ? 0 : 1;
    d.sway += (swayTarget - d.sway) * Math.min(1, delta * 3);
    const sway = Math.sin(state.clock.elapsedTime * 0.6) * 0.35 * d.sway;
    group.rotation.y = sway + d.offset;
  });

  return <primitive ref={groupRef} object={gltf.scene} scale={1.5} />;
}

export default function LogoScene({ className }: { className?: string }) {
  return (
    <Canvas
      className={`${className ?? ""} cursor-grab active:cursor-grabbing`}
      style={{ touchAction: "pan-y" }}
      camera={{ position: [0, 0, 3], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight
        position={[-3, -2, -4]}
        intensity={0.3}
        color="#ffd400"
      />
      <Particles />
      <Suspense fallback={null}>
        <LogoModel />
      </Suspense>
    </Canvas>
  );
}
