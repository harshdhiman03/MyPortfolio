'use client';

import { Text3D, type FontData } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { gsap } from 'gsap';
import fontData from 'three/examples/fonts/droid/droid_serif_regular.typeface.json';

export type IntroTextHandle = {
  playPhrase: () => void;
  playIdentity: () => void;
  reset: () => void;
  showFinal: () => void;
};

type LetterData = {
  char: string;
  position: [number, number, number];
  rotationZ: number;
};

const PHRASE = 'I solemnly swear that I am up to no good';
const NAME = 'Harsh Dhiman';
const SUBTITLE = 'Full-Stack Engineer - UI-Focused - AI Systems';
const FONT = fontData as unknown as FontData;

const IntroText = forwardRef<IntroTextHandle>(function IntroText(_, ref) {
  const letterRefs = useRef<Mesh[]>([]);
  const nameRef = useRef<Mesh>(null);
  const subtitleRef = useRef<Mesh>(null);
  const phraseTl = useRef<gsap.core.Timeline | null>(null);
  const identityTl = useRef<gsap.core.Timeline | null>(null);
  const centeredRef = useRef(false);
  const glowRef = useRef({ value: 0 });
  const shimmerActive = useRef(false);

  const letters = useMemo<LetterData[]>(() => {
    const chars = PHRASE.split('');
    const weights = chars.map((char) => (char === ' ' ? 0.6 : 1));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    const arcSpan = 0.9;
    const startAngle = -arcSpan / 2;
    const radius = 7.2;
    const centerY = -2.4;
    let acc = 0;

    const out: LetterData[] = [];
    for (let i = 0; i < chars.length; i += 1) {
      const char = chars[i];
      const t = acc / total;
      const angle = startAngle + t * arcSpan;
      acc += weights[i];
      if (char === ' ') continue;

      const x = Math.sin(angle) * radius;
      const y = centerY + Math.cos(angle) * radius;
      out.push({
        char,
        position: [x, y, 0],
        rotationZ: -angle,
      });
    }
    return out;
  }, []);

  const reset = () => {
    phraseTl.current?.pause(0);
    identityTl.current?.pause(0);

    letterRefs.current.forEach((mesh) => {
      if (!mesh) return;
      const material = mesh.material as MeshStandardMaterial;
      material.opacity = 0;
      material.emissiveIntensity = 0.2;
      mesh.scale.set(0.9, 0.9, 0.9);
    });

    if (nameRef.current) {
      const material = nameRef.current.material as MeshStandardMaterial;
      material.opacity = 0;
    }

    if (subtitleRef.current) {
      const material = subtitleRef.current.material as MeshStandardMaterial;
      material.opacity = 0;
    }

    glowRef.current.value = 0;
    shimmerActive.current = false;
  };

  const showFinal = () => {
    phraseTl.current?.pause(0);
    identityTl.current?.pause(0);

    letterRefs.current.forEach((mesh) => {
      if (!mesh) return;
      const material = mesh.material as MeshStandardMaterial;
      material.opacity = 1;
      material.emissiveIntensity = 0.2;
      mesh.scale.set(1, 1, 1);
    });

    if (nameRef.current) {
      const material = nameRef.current.material as MeshStandardMaterial;
      material.opacity = 1;
    }

    if (subtitleRef.current) {
      const material = subtitleRef.current.material as MeshStandardMaterial;
      material.opacity = 1;
    }

    glowRef.current.value = 0.8;
    shimmerActive.current = false;
  };

  useImperativeHandle(ref, () => ({
    playPhrase: () => phraseTl.current?.restart(),
    playIdentity: () => identityTl.current?.restart(),
    reset,
    showFinal,
  }));

  useFrame(({ clock }) => {
    if (!nameRef.current) return;
    const material = nameRef.current.material as MeshStandardMaterial;
    const shimmer = shimmerActive.current ? Math.sin(clock.getElapsedTime() * 6) * 0.08 : 0;
    material.emissiveIntensity = glowRef.current.value + shimmer;
  });

  useLayoutEffect(() => {
    if (centeredRef.current) return;
    letterRefs.current.forEach((mesh) => {
      if (!mesh) return;
      mesh.geometry.center();
    });
    if (nameRef.current) nameRef.current.geometry.center();
    if (subtitleRef.current) subtitleRef.current.geometry.center();
    centeredRef.current = true;
  }, [letters]);

  useLayoutEffect(() => {
    if (!letterRefs.current.length) return;
    const tl = gsap.timeline({ paused: true });

    letterRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const material = mesh.material as MeshStandardMaterial;
      material.opacity = 0;
      material.emissiveIntensity = 0.2;
      mesh.scale.set(0.9, 0.9, 0.9);

      const start = i * 0.05;
      tl.to(material, { opacity: 1, duration: 0.22, ease: 'power2.out' }, start);
      tl.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.25, ease: 'power2.out' }, start);
    });

    phraseTl.current = tl;
    return () => {
      tl.kill();
    };
  }, [letters]);

  useLayoutEffect(() => {
    if (!nameRef.current || !subtitleRef.current) return;
    const nameMaterial = nameRef.current.material as MeshStandardMaterial;
    const subtitleMaterial = subtitleRef.current.material as MeshStandardMaterial;

    nameMaterial.opacity = 0;
    subtitleMaterial.opacity = 0;
    glowRef.current.value = 0;

    const tl = gsap.timeline({ paused: true });
    tl.call(() => {
      shimmerActive.current = true;
    }, undefined, 0);
    tl.to(nameMaterial, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0);
    tl.to(glowRef.current, { value: 1.2, duration: 0.6, ease: 'power2.out' }, 0);
    tl.to(glowRef.current, { value: 0.8, duration: 1.2, ease: 'power2.out' }, 0.8);
    tl.to(subtitleMaterial, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.5);
    tl.call(() => {
      shimmerActive.current = false;
    }, undefined, 1.8);

    identityTl.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <group>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        {letters.map((letter, index) => (
          <Text3D
            key={`phrase-${index}`}
            ref={(el) => {
              if (el) letterRefs.current[index] = el;
            }}
            font={FONT}
            size={0.28}
            height={0.03}
            curveSegments={4}
            bevelEnabled={false}
            position={letter.position}
            rotation={[0, 0, letter.rotationZ]}
          >
            {letter.char}
            <meshStandardMaterial
              color="#f0d4a2"
              emissive="#f6d8a9"
              emissiveIntensity={0.2}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </Text3D>
        ))}
      </group>

      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <Text3D
          ref={nameRef}
          font={FONT}
          size={0.85}
          height={0.06}
          curveSegments={6}
          bevelEnabled={false}
          position={[0, 0, 0]}
        >
          {NAME}
          <meshStandardMaterial
            color="#f4d6a1"
            emissive="#f5d7a5"
            emissiveIntensity={0}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </Text3D>

        <Text3D
          ref={subtitleRef}
          font={FONT}
          size={0.22}
          height={0.02}
          curveSegments={4}
          bevelEnabled={false}
          position={[0, -0.9, 0]}
        >
          {SUBTITLE}
          <meshStandardMaterial
            color="#e6c79a"
            emissive="#000000"
            emissiveIntensity={0}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </Text3D>
      </group>
    </group>
  );
});

export default IntroText;