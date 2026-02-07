'use client';

import { useThree } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';
import { CanvasTexture, CatmullRomCurve3, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
import { gsap } from 'gsap';

export type FootstepsHandle = {
  play: () => void;
  reset: () => void;
};

type Step = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const STEP_COUNT = 12;

const Footsteps = forwardRef<FootstepsHandle>(function Footsteps(_, ref) {
  const { gl } = useThree();
  const geometry = useMemo(() => new PlaneGeometry(0.45, 0.78), []);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(30, 18, 12, 0.95)';
    ctx.beginPath();
    ctx.ellipse(64, 170, 28, 52, 0, 0, Math.PI * 2);
    ctx.fill();

    const toes = [
      [40, 70, 10],
      [56, 58, 11],
      [74, 56, 10],
      [90, 64, 8],
    ];

    toes.forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    const tex = new CanvasTexture(canvas);
    tex.anisotropy = Math.max(1, gl.capabilities.getMaxAnisotropy());
    tex.needsUpdate = true;
    return tex;
  }, [gl]);

  const path = useMemo(
    () =>
      new CatmullRomCurve3(
        [
          new Vector3(-1.6, 0, -4.3),
          new Vector3(-0.9, 0, -2.6),
          new Vector3(0.3, 0, -1.1),
          new Vector3(0.7, 0, 0.4),
        ],
        false,
        'catmullrom',
        0.5
      ),
    []
  );

  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [];
    for (let i = 0; i < STEP_COUNT; i += 1) {
      const t = i / (STEP_COUNT - 1);
      const position = path.getPoint(t);
      const tangent = path.getTangent(t).normalize();
      const angle = Math.atan2(tangent.x, tangent.z);
      const side = i % 2 === 0 ? -0.12 : 0.12;
      const normal = new Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(side);
      position.add(normal);

      out.push({
        position: [position.x, 0.02, position.z],
        rotation: [-Math.PI / 2, angle, 0],
      });
    }
    return out;
  }, [path]);

  const stepRefs = useRef<Mesh[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const reset = () => {
    stepRefs.current.forEach((mesh) => {
      if (!mesh) return;
      const material = mesh.material as MeshBasicMaterial;
      material.opacity = 0;
      mesh.scale.set(0.7, 0.7, 0.7);
    });
  };

  useImperativeHandle(ref, () => ({
    play: () => timelineRef.current?.restart(),
    reset,
  }));

  useLayoutEffect(() => {
    if (!texture) return;

    stepRefs.current.forEach((mesh) => {
      if (!mesh) return;
      const material = mesh.material as MeshBasicMaterial;
      material.opacity = 0;
      mesh.scale.set(0.7, 0.7, 0.7);
    });

    const tl = gsap.timeline({ paused: true });
    stepRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const material = mesh.material as MeshBasicMaterial;
      const start = i * 0.35;

      tl.to(
        material,
        { opacity: 0.6, duration: 0.25, ease: 'power2.out' },
        start
      );
      tl.to(
        mesh.scale,
        { x: 1, y: 1, z: 1, duration: 0.25, ease: 'back.out(2)' },
        start
      );
      tl.to(
        material,
        { opacity: 0, duration: 0.6, ease: 'power2.in' },
        start + 0.9
      );
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [texture]);

  useLayoutEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  if (!texture) return null;

  return (
    <group>
      {steps.map((step, index) => (
        <mesh
          key={`footstep-${index}`}
          ref={(el) => {
            if (el) stepRefs.current[index] = el;
          }}
          position={step.position}
          rotation={step.rotation}
          geometry={geometry}
          renderOrder={2}
        >
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0}
            depthWrite={false}
            color="#2a1c13"
          />
        </mesh>
      ))}
    </group>
  );
});

export default Footsteps;
