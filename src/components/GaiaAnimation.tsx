"use client";

import { useRef, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, useTexture, Html } from "@react-three/drei";

// Utility to convert Lat/Lng to 3D Cartesian coordinates on a sphere
const getCoordinates = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const anomalies = [
  { id: "A-001", name: "GROUND ZERO", lat: 37.2431, lng: -115.7930, status: "ACTIVE" }, // Area 51, NV
  { id: "A-002", name: "TUNGUSKA", lat: 60.9167, lng: 101.9500, status: "MONITORED" }, // Tunguska, Russia
  { id: "A-003", name: "SECTOR 7G", lat: 51.3890, lng: 30.0995, status: "CONTAINED" }, // Chernobyl, Ukraine
];

const operatives = [
  { id: "OP-07", name: "PHOENIX", lat: 40.7128, lng: -74.0060, status: "DEPLOYED" }, // NYC
  { id: "OP-12", name: "SHADOW", lat: 51.5074, lng: -0.1278, status: "STANDBY" }, // London
  { id: "OP-42", name: "AEGIS", lat: 35.6762, lng: 139.6503, status: "DEPLOYED" }, // Tokyo
];

const getThreatColor = (status: string) => {
  switch (status) {
    case "ACTIVE": return "#E50914"; // Red
    case "MONITORED": return "#ffaa00"; // Amber
    case "CONTAINED": return "#00aa55"; // Green
    default: return "#F8F9FA";
  }
};

function Marker({ anomaly, isHovered, setHoveredAnomaly }: { anomaly: any, isHovered: boolean, setHoveredAnomaly: (id: string | null) => void }) {
  const position = getCoordinates(anomaly.lat, anomaly.lng, 2.01);
  const color = getThreatColor(anomaly.status);
  
  const ringRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      // Breathing effect: scale oscillates between 1.2 and 1.8
      const scale = 1.5 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
      ringRef.current.scale.set(isHovered ? 2.5 : scale, isHovered ? 2.5 : scale, 1);
    }
    if (sphereRef.current) {
      // Slight breathing on the core sphere too
      const sphereScale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.1;
      sphereRef.current.scale.set(sphereScale, sphereScale, sphereScale);
    }
  });

  return (
    <group position={position}>
      {/* 3D Marker */}
      <mesh 
        ref={sphereRef}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredAnomaly(anomaly.id); }}
        onPointerOut={() => setHoveredAnomaly(null)}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Glowing Ring (Breathing) */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.05, 0.08, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={isHovered ? 0.8 : 0.4} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* HTML UI Overlay */}
      <Html distanceFactor={15} zIndexRange={[100, 0]}>
        <div 
          className={`font-mono text-[10px] tracking-widest whitespace-nowrap px-3 py-2 border transition-all duration-300 ${
            isHovered 
              ? "bg-[#1A1A1A]/90 backdrop-blur-md opacity-100 scale-100" 
              : "bg-transparent opacity-0 scale-90 pointer-events-none"
          }`}
          style={{
            borderColor: color,
            color: color
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-2 border-b border-inherit pb-2">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: color }} />
              <span className="font-bold text-xs">{anomaly.id} // {anomaly.name}</span>
            </div>
          </div>
          <div className="text-[#F8F9FA] mb-2">
            LAT: {anomaly.lat.toFixed(4)}<br/>
            LNG: {anomaly.lng.toFixed(4)}
          </div>
          <div 
            className="text-center font-bold px-3 py-1 bg-[#1a1a1a] text-xs uppercase"
            style={{ 
              color: color, 
              border: `1px solid ${color}`,
              clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)"
            }}
          >
            {anomaly.status} THREAT DETECTED
          </div>
        </div>
      </Html>
    </group>
  );
}

function OperativeMarker({ op, isHovered, setHoveredAnomaly }: { op: any, isHovered: boolean, setHoveredAnomaly: (id: string | null) => void }) {
  const position = getCoordinates(op.lat, op.lng, 2.01);
  const color = op.status === "DEPLOYED" ? "#E50914" : "#F8F9FA";
  
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime();
    }
  });

  return (
    <group position={position}>
      {/* Operative Point */}
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHoveredAnomaly(op.id); }}
        onPointerOut={() => setHoveredAnomaly(null)}
      >
        <boxGeometry args={[0.03, 0.03, 0.03]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Rotating Reticle */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.04, 0.05, 4]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 1 : 0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML UI Overlay */}
      <Html distanceFactor={15} zIndexRange={[100, 0]}>
        <div 
          className={`font-mono text-[10px] tracking-widest whitespace-nowrap px-3 py-2 border transition-all duration-300 ${
            isHovered ? "bg-[#001122]/90 backdrop-blur-md opacity-100 scale-100" : "bg-transparent opacity-0 scale-90 pointer-events-none"
          }`}
          style={{ borderColor: color, color: color }}
        >
          <div className="flex items-center gap-2 mb-2 border-b border-inherit pb-2">
            <span className="font-bold text-xs">{op.id} // {op.name}</span>
          </div>
          <div className="text-[#F8F9FA] mb-2">
            LAT: {op.lat.toFixed(4)}<br/>
            LNG: {op.lng.toFixed(4)}
          </div>
          <div className="text-center font-bold px-3 py-1 bg-[#001a1a] text-xs uppercase" style={{ color: color, border: `1px solid ${color}` }}>
            STATUS: {op.status}
          </div>
        </div>
      </Html>
    </group>
  );
}

function EarthScene({ layers }: { layers: { atmospheric: boolean; oceanic: boolean; anomalies: boolean; operatives: boolean } }) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const earthMap = useTexture("/earth_texture.jpg");
  earthMap.colorSpace = THREE.SRGBColorSpace;
  
  const [hoveredAnomaly, setHoveredAnomaly] = useState<string | null>(null);

  // We will let OrbitControls handle auto-rotation so it's fully interactive
  // removed manual earth rotation useFrame

  return (
    <group ref={earthGroupRef}>
      <ambientLight intensity={0.6} />
      {/* Directional lighting to create soft natural shadows */}
      <directionalLight position={[5, 3, 5]} intensity={2.0} color="#F8F9FA" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#F8F9FA" />

      {/* The Earth */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={earthMap}
          roughness={0.7}
          metalness={0.2}
          color="#F8F9FA" // Full color texture
        />
      </mesh>

      {/* Wireframe Atmosphere Overlay */}
      {layers.atmospheric && (
        <mesh scale={[2.02, 2.02, 2.02]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial 
            color="#E50914" 
            wireframe={true} 
            transparent={true} 
            opacity={0.05} 
          />
        </mesh>
      )}

      {/* Anomalies */}
      {layers.anomalies && anomalies.map((anomaly) => (
        <Marker 
          key={anomaly.id} 
          anomaly={anomaly} 
          isHovered={hoveredAnomaly === anomaly.id}
          setHoveredAnomaly={setHoveredAnomaly}
        />
      ))}

      {/* Operatives */}
      {layers.operatives && operatives.map((op) => (
        <OperativeMarker 
          key={op.id} 
          op={op} 
          isHovered={hoveredAnomaly === op.id}
          setHoveredAnomaly={setHoveredAnomaly}
        />
      ))}
    </group>
  );
}

export default function GaiaAnimation() {
  const [layers, setLayers] = useState({
    atmospheric: true,
    oceanic: true,
    anomalies: true,
    operatives: false
  });

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent overflow-hidden flex items-center justify-center">
      
      {/* Top Left Viewport Overlay (Moved down to avoid TopNavigation overlap) */}
      <div className="absolute top-64 left-8 z-10 font-mono tracking-widest text-[10px] text-[#E50914]/80 pointer-events-auto bg-[#050505]/60 p-4 border border-[#E50914]/20 backdrop-blur-sm rounded-sm">
        <div className="mb-1">VIEWPORT: PLANETARY_MONITOR</div>
        <div>PROJECTION: ORTHOGRAPHIC_SIM</div>
        <div className="mt-4 text-[#F8F9FA] border-b border-[#E50914]/20 pb-1 mb-2">LAYERS:</div>
        <div className="flex flex-col gap-2 pl-2 border-l-2 border-[#E50914]/40">
          <button onClick={() => toggleLayer('atmospheric')} className="flex items-center text-left hover:text-[#F8F9FA] transition-colors">
            <span className={`w-4 text-center mr-2 ${layers.atmospheric ? 'text-[#E50914]' : 'text-[#555555]'}`}>
              [{layers.atmospheric ? 'x' : ' '}]
            </span>
            ATMOSPHERIC
          </button>
          <button onClick={() => toggleLayer('oceanic')} className="flex items-center text-left hover:text-[#F8F9FA] transition-colors" title="Base map texture (always active)">
            <span className={`w-4 text-center mr-2 ${layers.oceanic ? 'text-[#E50914]' : 'text-[#555555]'}`}>
              [{layers.oceanic ? 'x' : ' '}]
            </span>
            OCEANIC
          </button>
          <button onClick={() => toggleLayer('anomalies')} className="flex items-center text-left hover:text-[#F8F9FA] transition-colors">
            <span className={`w-4 text-center mr-2 ${layers.anomalies ? 'text-[#E50914]' : 'text-[#555555]'}`}>
              [{layers.anomalies ? 'x' : ' '}]
            </span>
            ANOMALIES
          </button>
          <button onClick={() => toggleLayer('operatives')} className="flex items-center text-left hover:text-[#F8F9FA] transition-colors text-[#E50914]">
            <span className={`w-4 text-center mr-2 ${layers.operatives ? 'text-[#E50914]' : 'text-[#555555]'}`}>
              [{layers.operatives ? 'x' : ' '}]
            </span>
            OPERATIVES
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Cinematic controls: allow rotation, restrict zoom out */}
        <OrbitControls 
          enableZoom={true} 
          minDistance={3}
          maxDistance={8}
          enablePan={false} 
          autoRotate={true} 
          autoRotateSpeed={0.5}
        />
        <Suspense fallback={
          <Html center>
            <div className="text-[#E50914] font-mono tracking-widest text-sm animate-pulse">
              [ SYNCHRONIZING PLANETARY DATA ]
            </div>
          </Html>
        }>
          <EarthScene layers={layers} />
        </Suspense>
      </Canvas>
    </div>
  );
}
