"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import Earth from './Earth';
import Skybox from './Skybox';
import EnergyParticles from './EnergyParticles';
import GuardianMesh from './GuardianMesh';

function SceneManager() {
  const [time, setTime] = useState(0);
  const directionRef = useRef(1); // 1 = forward, -1 = reverse
  
  const [particleOpacity, setParticleOpacity] = useState(0);
  const [guardianMorphValue, setGuardianMorphValue] = useState(0);

  useFrame((state, delta) => {
    let newTime = time + 0.5 * delta * directionRef.current;
    
    if (newTime >= 1) {
      newTime = 1;
      directionRef.current = -1;
    } else if (newTime <= 0) {
      newTime = 0;
      directionRef.current = 1;
    }
    
    setTime(newTime);
    
    // 0 to 0.5: Particles form forcefield
    // 0.5 to 1.0: Forcefield morphs to Guardian
    const pOpacity = THREE.MathUtils.lerp(0, 1, newTime < 0.5 ? newTime * 2 : (1 - newTime) * 2);
    setParticleOpacity(pOpacity);
    
    const morphValue = THREE.MathUtils.lerp(0, 1, newTime > 0.5 ? (newTime - 0.5) * 2 : 0);
    setGuardianMorphValue(morphValue);
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      
      <Skybox />
      <Earth />
      
      <EnergyParticles time={time} opacity={particleOpacity} />
      <GuardianMesh morphValue={guardianMorphValue} />
    </>
  );
}

export default function GuardianAnimation() {
  return (
    <div className="w-full h-[500px] relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <SceneManager />
      </Canvas>
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
        <p className="text-green-400 font-mono text-sm uppercase tracking-widest opacity-80">
          G.A.I.A. Initialization Loop
        </p>
      </div>
    </div>
  );
}
