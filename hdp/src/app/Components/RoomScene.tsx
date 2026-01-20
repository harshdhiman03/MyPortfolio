'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

export default function RoomScene() {
  const roomRef = useRef<Group>(null);
  
  try {
    const { scene } = useGLTF('/models/gryffindor_common_roomglb.glb');

    return (
      <primitive
        object={scene}
        ref={roomRef}
        position={[0, 0, 0]}
        scale={1}
      />
    );
  } catch (error) {
    console.error('Failed to load model:', error);
    return null;
  }
}
