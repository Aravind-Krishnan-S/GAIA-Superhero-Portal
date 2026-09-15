"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.05 * delta;
    }
  });

  return (
    <group>
      {/* Main Earth Body (Placeholder procedural material) */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#1a3d66" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Atmosphere (Fresnel effect placeholder) */}
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshPhysicalMaterial 
          color="#88ccff"
          transparent={true}
          opacity={0.3}
          transmission={0.9}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
