"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Test3D() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <ambientLight />
        <directionalLight position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
