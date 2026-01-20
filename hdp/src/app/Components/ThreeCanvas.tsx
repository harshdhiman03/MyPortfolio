'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import RoomScene from './RoomScene';

export default function ThreeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 0], fov: 75 }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <RoomScene />
      </Suspense>
    </Canvas>
  );
}
