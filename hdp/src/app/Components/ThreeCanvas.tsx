'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Environment } from '@react-three/drei';

const RoomScene = dynamic(() => import('./RoomScene'), { ssr: false });

export default function ThreeCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.6, 3], fov: 75 }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Suspense fallback={null}>
        <RoomScene />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
