'use client';

import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';

type SceneCanvasProps = {
  children: ReactNode;
};

// export default function SceneCanvas({ children }: SceneCanvasProps) {
//   return (
//     <Canvas
//       camera={{ position: [0, 5, 10], fov: 50 }}
//       gl={{ antialias: true }}
//     >
//       <ambientLight intensity={0.4} />
// <directionalLight position={[5, 10, 5]} intensity={1} />

// <mesh>
//   <boxGeometry args={[2, 2, 2]} />
//   <meshStandardMaterial color="orange" />
// </mesh>
//         {children}
//     </Canvas>
//   );
// }

import CameraController from './CameraController';

export default function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <CameraController />
      {children}
    </Canvas>
  );
}
