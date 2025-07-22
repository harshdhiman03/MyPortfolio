'use client';

import { useGLTF, FirstPersonControls } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

export default function RoomScene() {
  const roomRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/gryffindor_common_roomglb.glb');

  return (
    <>
      <primitive
        object={scene}
        ref={roomRef}
        position={[0, -1.5, 0]}
        scale={1}
      />
      <FirstPersonControls
        lookSpeed={0.1}
        movementSpeed={2}
        lookVertical={true}
        constrainVertical={false}
        activeLook={true}
        heightCoef={1.6}
      />
    </>
  );
}
