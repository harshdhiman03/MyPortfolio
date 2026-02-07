'use client';

import { useFrame } from '@react-three/fiber';
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { MeshStandardMaterial, PlaneGeometry } from 'three';

export type MapUniforms = {
  uTime: { value: number };
  uBrightness: { value: number };
  uContrast: { value: number };
  uVignette: { value: number };
  uGrain: { value: number };
  uRipple: { value: number };
};

type MapPlaneProps = {
  materialRef: React.RefObject<MeshStandardMaterial | null>;
};

function MapPlane({ materialRef }: MapPlaneProps) {
  const geometry = useMemo(() => new PlaneGeometry(14, 10, 80, 60), []);
  const uniformsRef = useRef<MapUniforms>({
    uTime: { value: 0 },
    uBrightness: { value: 0.62 },
    uContrast: { value: 0.95 },
    uVignette: { value: 0.95 },
    uGrain: { value: 0.08 },
    uRipple: { value: 0.45 },
  });

  useFrame(({ clock }) => {
    uniformsRef.current.uTime.value = clock.getElapsedTime();
  });

  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.userData.uniforms = uniformsRef.current;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniformsRef.current.uTime;
      shader.uniforms.uBrightness = uniformsRef.current.uBrightness;
      shader.uniforms.uContrast = uniformsRef.current.uContrast;
      shader.uniforms.uVignette = uniformsRef.current.uVignette;
      shader.uniforms.uGrain = uniformsRef.current.uGrain;
      shader.uniforms.uRipple = uniformsRef.current.uRipple;

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uTime;
uniform float uRipple;
`
        )
        .replace(
          '#include <begin_vertex>',
          `vec3 transformed = vec3(position);
float ripple = (sin((uv.x + uTime * 0.08) * 10.0) + sin((uv.y + uTime * 0.06) * 12.0)) * 0.02;
float curve = (pow(uv.x - 0.5, 2.0) + pow(uv.y - 0.5, 2.0)) * 0.4;
transformed.z += (ripple - curve) * uRipple;
`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uBrightness;
uniform float uContrast;
uniform float uVignette;
uniform float uGrain;
`
        )
        .replace(
          '#include <dithering_fragment>',
          `float vignette = smoothstep(0.35, uVignette, distance(vUv, vec2(0.5)));
float grain = (fract(sin(dot(vUv * vec2(127.1, 311.7), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uGrain;
vec3 inked = diffuseColor.rgb + grain;
inked *= (1.0 - vignette * 0.55);
inked = (inked - 0.5) * uContrast + 0.5;
inked *= uBrightness;
diffuseColor.rgb = inked;
#include <dithering_fragment>
`
        );
    };

    material.needsUpdate = true;
  }, [materialRef]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color="#d6b88a"
        roughness={0.92}
        metalness={0.04}
      />
    </mesh>
  );
}

export default memo(MapPlane);
