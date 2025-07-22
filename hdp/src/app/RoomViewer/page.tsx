"use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import { Suspense } from "react";

// function RoomModel() {
//   const { scene } = useGLTF("/models/gryffindor_common_roomglb.glb");
//   return <primitive object={scene} scale={1} />;
// }

// export default function RoomViewer() {
//   return (
//     <div className="w-screen h-screen">
//       <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
//         <ambientLight intensity={1} />
//         <directionalLight position={[2, 4, 5]} intensity={1} />
//         <Suspense fallback={null}>
//           <RoomModel />
//           <Environment preset="apartment" />
//         </Suspense>
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

import { Canvas, useFrame } from "@react-three/fiber";
import { PointerLockControls, useGLTF, useKeyboardControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function RoomModel() {
  const { scene } = useGLTF("/models/gryffindor_common_roomglb.glb");
  return <primitive object={scene} scale={1} />;
}

function PlayerCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);

//   useKeyboardControls();

  useFrame((state, delta) => {
    const velocity = new THREE.Vector3();
    const speed = 2;

    if (controlsRef.current) {
      const keys = controlsRef.current;
      if (keys.forward) velocity.z -= speed * delta;
      if (keys.backward) velocity.z += speed * delta;
      if (keys.left) velocity.x -= speed * delta;
      if (keys.right) velocity.x += speed * delta;

      state.camera.position.add(velocity.applyEuler(state.camera.rotation));
    }
  });

  return (
    <>
      <PointerLockControls ref={controlsRef} />
    </>
  );
}

export default function FirstPersonRoom() {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ fov: 75, position: [0, 1.6, 5] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 5, 3]} />
        <Suspense fallback={null}>
          <RoomModel />
          <PlayerCamera />
        </Suspense>
      </Canvas>
    </div>
  );
}
