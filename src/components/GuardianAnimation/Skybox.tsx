"use client";

import React from 'react';
import { Stars } from '@react-three/drei';

export default function Skybox() {
  return (
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
  );
}
