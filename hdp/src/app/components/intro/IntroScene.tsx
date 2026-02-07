'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sparkles } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useLayoutEffect, useRef } from 'react';
import {
  DirectionalLight,
  Group,
  Material,
  MeshStandardMaterial,
  PerspectiveCamera as ThreePerspectiveCamera,
  Points,
  Vector3,
} from 'three';
import { gsap } from 'gsap';
import MapPlane, { MapUniforms } from './MapPlane';
import Footsteps, { FootstepsHandle } from './Footsteps';
import IntroText, { IntroTextHandle } from './IntroText';
import { useIntroState } from './useIntroState';

function IntroWorld() {
  const mapGroupRef = useRef<Group>(null);
  const mapMaterialRef = useRef<MeshStandardMaterial>(null);
  const sparklesRef = useRef<Points>(null);
  const dirLightRef = useRef<DirectionalLight>(null);
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const footstepsRef = useRef<FootstepsHandle>(null);
  const introTextRef = useRef<IntroTextHandle>(null);
  const lookAtRef = useRef(new Vector3(0, 0, 0));

  const introStarted = useIntroState((s) => s.introStarted);
  const introCompleted = useIntroState((s) => s.introCompleted);
  const setIntroStarted = useIntroState((s) => s.setIntroStarted);
  const setIntroCompleted = useIntroState((s) => s.setIntroCompleted);

  const { sparklesY } = useSpring({
    from: { sparklesY: 0.28 },
    to: { sparklesY: 0.34 },
    loop: { reverse: true },
    config: { mass: 1, tension: 28, friction: 12 },
    pause: !introStarted,
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dirLightRef.current) {
      const flicker = (Math.sin(t * 3.1) + Math.sin(t * 4.7 + 1.4)) * 0.015;
      dirLightRef.current.intensity = 1 + flicker;
    }
    if (cameraRef.current) {
      cameraRef.current.lookAt(lookAtRef.current);
    }
  });

  useLayoutEffect(() => {
    if (!mapGroupRef.current || !mapMaterialRef.current) return;
    const uniforms = mapMaterialRef.current.userData.uniforms as MapUniforms | undefined;
    const sparklesMaterial = sparklesRef.current?.material as (Material & { opacity: number }) | undefined;

    if (introCompleted) {
      mapGroupRef.current.scale.set(1, 1, 1);
      mapGroupRef.current.rotation.set(0, 0, 0);
      if (uniforms) {
        uniforms.uBrightness.value = 1;
        uniforms.uContrast.value = 1.05;
        uniforms.uRipple.value = 1;
      }
      if (sparklesMaterial) {
        sparklesMaterial.opacity = 0.35;
        sparklesMaterial.transparent = true;
      }
      introTextRef.current?.showFinal();
      footstepsRef.current?.reset();
      return;
    }

    if (!introStarted) {
      mapGroupRef.current.scale.set(0.96, 0.96, 0.96);
      mapGroupRef.current.rotation.set(0.05, 0.1, 0);
      if (uniforms) {
        uniforms.uBrightness.value = 0.62;
        uniforms.uContrast.value = 0.95;
        uniforms.uRipple.value = 0.45;
      }
      if (sparklesMaterial) {
        sparklesMaterial.opacity = 0.08;
        sparklesMaterial.transparent = true;
      }
      introTextRef.current?.reset();
      footstepsRef.current?.reset();
    }
  }, [introCompleted, introStarted]);

  const startedRef = useRef(false);
  useLayoutEffect(() => {
    if (introCompleted || startedRef.current) return;
    if (!cameraRef.current || !mapMaterialRef.current || !mapGroupRef.current) return;

    startedRef.current = true;

    const uniforms = mapMaterialRef.current.userData.uniforms as MapUniforms | undefined;
    const sparklesMaterial = sparklesRef.current?.material as (Material & { opacity: number }) | undefined;

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

    tl.to(mapGroupRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.8 }, 0);
    tl.to(mapGroupRef.current.rotation, { x: 0, y: 0, z: 0, duration: 1.8 }, 0);

    if (uniforms) {
      tl.to(uniforms.uBrightness, { value: 1, duration: 2.2 }, 0);
      tl.to(uniforms.uContrast, { value: 1.05, duration: 2.2 }, 0);
      tl.to(uniforms.uRipple, { value: 1, duration: 2.2 }, 0);
    }

    if (sparklesMaterial) {
      tl.to(sparklesMaterial, { opacity: 0.35, duration: 2.0 }, 0.6);
    }

    tl.add(() => footstepsRef.current?.play(), 1.2);
    tl.add(() => introTextRef.current?.playPhrase(), 1.5);
    tl.add(() => introTextRef.current?.playIdentity(), 3.1);

    tl.to(
      cameraRef.current.position,
      { x: 0.3, y: 4.0, z: 10.8, duration: 3.5, ease: 'power2.inOut' },
      1.2
    );
    tl.to(
      lookAtRef.current,
      { x: 0.1, y: 0.15, z: 0, duration: 3.5, ease: 'power2.inOut' },
      1.2
    );
    tl.to(
      cameraRef.current.position,
      { x: 0.15, y: 3.4, z: 9.2, duration: 3.8, ease: 'power2.inOut' },
      3.1
    );
    tl.to(
      lookAtRef.current,
      { x: 0, y: 0.2, z: -0.05, duration: 3.8, ease: 'power2.inOut' },
      3.1
    );

    tl.eventCallback('onComplete', () => {
      setIntroCompleted(true);
    });

    const starter = gsap.delayedCall(1, () => {
      setIntroStarted(true);
      tl.play(0);
    });

    return () => {
      starter.kill();
      tl.kill();
    };
  }, [introCompleted, setIntroCompleted, setIntroStarted]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 4.2, 12]}
        fov={45}
        near={0.1}
        far={100}
      />

      <ambientLight color="#ffd7a6" intensity={0.35} />
      <directionalLight
        ref={dirLightRef}
        color="#ffd0a0"
        position={[-6, 8, 6]}
        intensity={1}
      />

      <group ref={mapGroupRef}>
        <MapPlane materialRef={mapMaterialRef} />

        <a.group
          position-x={0}
          position-z={0}
          position-y={sparklesY}
          scale={[10, 1.3, 7]}
        >
          <Sparkles
            ref={sparklesRef}
            count={90}
            size={1.2}
            speed={0.2}
            color="#f4d39a"
            opacity={0.08}
            noise={0.6}
          />
        </a.group>

        <Footsteps ref={footstepsRef} />
        <IntroText ref={introTextRef} />
      </group>
    </>
  );
}

export default function IntroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={["#120a08"]} />
      <IntroWorld />
    </Canvas>
  );
}
