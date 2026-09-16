"use client";

import { useRef, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const BUILDINGS_COUNT = 400;
const CITY_SIZE = 100;

function CityGeometry() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Create a base geometry and material for all buildings
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#0a0a0a",
      roughness: 0.8,
      metalness: 0.8,
      emissive: "#111111",
      emissiveIntensity: 0.2
    });
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < BUILDINGS_COUNT; i++) {
      // Random position within city limits
      const x = (Math.random() - 0.5) * CITY_SIZE;
      const z = (Math.random() - 0.5) * CITY_SIZE;

      // Leave a "highway" down the middle (x between -5 and 5 is empty)
      if (x > -5 && x < 5) continue;

      // Random height for skyscrapers
      const height = Math.random() > 0.8 ?
        Math.random() * 20 + 10 : // Tall skyscrapers
        Math.random() * 8 + 2;    // Regular buildings

      dummy.position.set(x, height / 2, z);
      dummy.scale.set(
        Math.random() * 2 + 1, // Width
        height,                // Height
        Math.random() * 2 + 1  // Depth
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Randomly assign emissive color to simulate neon lights on some buildings
      if (Math.random() > 0.7) {
        const neonColor = new THREE.Color(
          Math.random() > 0.5 ? "#E50914" : "#E50914" // GAIA Red or red
        );
        meshRef.current.setColorAt(i, neonColor);
      } else {
        meshRef.current.setColorAt(i, new THREE.Color("#0a0a0a"));
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, []);

  // Endless forward motion
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Move city towards camera
    meshRef.current.position.z += 10 * delta;

    // Reset position to create seamless loop
    if (meshRef.current.position.z > CITY_SIZE / 2) {
      meshRef.current.position.z -= CITY_SIZE / 2;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, BUILDINGS_COUNT]}
      receiveShadow
      castShadow
    />
  );
}

function NeonVehicles() {
  const groupRef = useRef<THREE.Group>(null);
  const vehicleCount = 20;

  const vehicles = useMemo(() => {
    return Array.from({ length: vehicleCount }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8, // Stick to the middle highway
        Math.random() * 5 + 1,     // Flying altitude
        (Math.random() - 0.5) * CITY_SIZE // Spread across Z
      ),
      speed: Math.random() * 30 + 10,
      color: Math.random() > 0.5 ? "#E50914" : "#E50914"
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const v = vehicles[i];
      child.position.z += v.speed * delta;
      if (child.position.z > CITY_SIZE / 2) {
        child.position.z = -CITY_SIZE / 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {vehicles.map((v, i) => (
        <mesh key={i} position={v.position}>
          <boxGeometry args={[0.2, 0.1, 0.5]} />
          <meshBasicMaterial color={v.color} />
          <pointLight color={v.color} intensity={2} distance={10} />
        </mesh>
      ))}
    </group>
  );
}

export default function CyberpunkCityscape() {
  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden">

      <Canvas camera={{ position: [0, 15, 30], fov: 60, rotation: [-Math.PI / 8, 0, 0] }}>
        <fog attach="fog" args={["#050505", 10, 80]} />
        <ambientLight intensity={0.2} color="#E50914" />

        {/* Neon City Lighting */}
        <directionalLight position={[10, 20, -10]} intensity={2} color="#E50914" />
        <directionalLight position={[-10, 10, -20]} intensity={1} color="#E50914" />
        <pointLight position={[0, 10, 0]} intensity={5} color="#E50914" distance={50} />

        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

        <CityGeometry />
        <NeonVehicles />
      </Canvas>
    </div>
  );
}
