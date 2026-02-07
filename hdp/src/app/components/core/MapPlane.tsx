'use client';

import type { ThreeElements } from '@react-three/fiber';

type MeshProps = ThreeElements['mesh'];

export default function MapPlane(props: MeshProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="#e8dcc5"
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}
