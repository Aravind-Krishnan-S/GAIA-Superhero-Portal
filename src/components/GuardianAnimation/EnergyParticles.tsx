"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const particleVertexShader = `
uniform float uTime;
uniform float uOpacity;
attribute float randoms;

varying float vOpacity;

void main() {
  vec3 pos = position;
  float speed = 2.0;
  float t = uTime * speed + randoms * 10.0; 
  
  float localTime = mod(t, 2.0);
  float radius = 1.2;
  
  vec3 dir = normalize(position);
  if (length(dir) == 0.0) { dir = vec3(0.0, 1.0, 0.0); }
  
  float phase1 = smoothstep(0.0, 0.5, uTime); 
  float phase2 = smoothstep(0.5, 1.0, uTime); 
  
  vec3 currentPos = mix(pos * 0.1, dir * radius, phase1);
  
  vec3 finalPos = currentPos;
  finalPos.xz += vec2(sin(uTime * 10.0 + randoms * 100.0), cos(uTime * 10.0 + randoms * 100.0)) * phase2 * 0.2;
  finalPos.y += sin(uTime * 5.0 + randoms * 50.0) * phase2 * 0.2;
  
  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_PointSize = (8.0 * (1.0 - phase1 * 0.5)) * (10.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  
  vOpacity = uOpacity * (1.0 - phase2 * 0.5); 
}
`;

const particleFragmentShader = `
uniform vec3 uColor;
varying float vOpacity;

void main() {
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if (ll > 0.5) discard;
  
  float alpha = (0.5 - ll) * 2.0;
  gl_FragColor = vec4(uColor, alpha * vOpacity);
}
`;

export default function EnergyParticles({ time, opacity }: { time: number, opacity: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const particleCount = 2000;
  
  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const rands = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random());
      
      const sinPhi = Math.sin(phi);
      pos[i * 3 + 0] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      rands[i] = Math.random();
    }
    
    return { positions: pos, randoms: rands };
  }, []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uColor: { value: new THREE.Color("#00ff88") }
  }), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-randoms" 
          args={[randoms, 1]} 
        />
      </bufferGeometry>
      <shaderMaterial 
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
