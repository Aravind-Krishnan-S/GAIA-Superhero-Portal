"use client";

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const guardianVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const guardianFragmentShader = `
uniform float uMorphValue;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  // Dissolve effect based on uMorphValue and uv
  float dissolve = step(vUv.y, uMorphValue);
  vec3 glowColor = uColor * 2.0;
  
  gl_FragColor = vec4(glowColor, dissolve * uMorphValue);
}
`;

export default function GuardianMesh({ morphValue }: { morphValue: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMorphValue.value = morphValue;
    }
  });

  const uniforms = useMemo(() => ({
    uMorphValue: { value: 0.0 },
    uColor: { value: new THREE.Color("#00ff88") }
  }), []);

  return (
    <mesh position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Using a capsule as a placeholder for humanoid, wrapped around Earth */}
      <capsuleGeometry args={[1.3, 0.5, 32, 32]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={guardianVertexShader}
        fragmentShader={guardianFragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
