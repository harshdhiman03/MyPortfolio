'use client';

import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Vector3 } from 'three';
import { useCameraStore } from '../../store/useCameraStore';

export default function CameraController() {
  const { camera } = useThree();
  const { position, lookAt } = useCameraStore();

  const lookAtRef = useRef(new Vector3());

  useEffect(() => {
    // Animate camera position
    gsap.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1.6,
      ease: 'power3.out',
    });

    // Animate lookAt separately
    gsap.to(lookAtRef.current, {
      x: lookAt[0],
      y: lookAt[1],
      z: lookAt[2],
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: () => {
        camera.lookAt(lookAtRef.current);
      },
    });
  }, [position, lookAt, camera]);

  return null;
}
