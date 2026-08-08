import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, Moon, Sparkles, Layers, CheckCircle2, RotateCw } from 'lucide-react';

// 3D Procedural Soft Luxury Room Model
function ArchitecturalRoom({ lightingMode, materialColor }: { lightingMode: 'day' | 'dusk' | 'night'; materialColor: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  const getLightIntensity = () => {
    if (lightingMode === 'day') return { ambient: 2.2, main: 3.5, gold: 1.0 };
    if (lightingMode === 'dusk') return { ambient: 1.4, main: 2.2, gold: 2.5 };
    return { ambient: 0.8, main: 1.2, gold: 3.5 };
  };

  const lights = getLightIntensity();

  return (
    <group ref={meshRef}>
      {/* Lighting Rig */}
      <ambientLight intensity={lights.ambient} color="#FFFDF8" />
      <directionalLight position={[10, 15, 10]} intensity={lights.main} color={lightingMode === 'dusk' ? '#FFB86C' : '#FFFFFF'} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={lights.gold} color="#A88B57" />

      {/* Room Floor (Travertine Sandstone) */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="#E8E3D9" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Back Wall (Warm Venetian Plaster) */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <boxGeometry args={[10, 10, 0.2]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.8} />
      </mesh>

      {/* Left Architectural Pillar (Smoked Oak) */}
      <mesh position={[-4.5, 3, 0]}>
        <boxGeometry args={[0.8, 10, 10]} />
        <meshStandardMaterial color="#4A443C" roughness={0.5} />
      </mesh>

      {/* Central Luxury Lounge Sofa */}
      <mesh position={[0, -1, 0]} castShadow>
        <boxGeometry args={[5, 1.2, 2.5]} />
        <meshStandardMaterial color={materialColor} roughness={0.4} />
      </mesh>
      
      {/* Sofa Backrest */}
      <mesh position={[0, -0.1, -1]} castShadow>
        <boxGeometry args={[5, 0.8, 0.6]} />
        <meshStandardMaterial color={materialColor} roughness={0.4} />
      </mesh>

      {/* Floating Italian Marble Coffee Table */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, -1.2, 2]} castShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
          <meshStandardMaterial color="#FAF9F5" roughness={0.1} metalness={0.7} />
        </mesh>
      </Float>

      {/* Gold Sculptural Light Fixture */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 3.5, 0]}>
          <torusGeometry args={[1.8, 0.08, 16, 100]} />
          <meshStandardMaterial color="#A88B57" metalness={0.9} roughness={0.1} emissive="#A88B57" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      {/* Interactive 3D Hotspot 1: Ceiling Light */}
      <Html position={[0, 4, 0]}>
        <div className="group relative cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-[#A88B57]/40 border border-[#A88B57] flex items-center justify-center animate-ping absolute inset-0" />
          <div className="w-6 h-6 rounded-full bg-[#A88B57] border border-white text-[10px] font-bold text-white flex items-center justify-center relative z-10 shadow-lg">
            1
          </div>
          <div className="absolute left-8 top-0 hidden group-hover:block w-48 p-3 rounded-xl bg-white border border-[#1A1917]/15 text-xs text-[#1A1917] backdrop-blur-md z-20 shadow-2xl">
            <span className="font-semibold text-[#8C6D3B] block">Bespoke Chandelier</span>
            <span>24k Gold Electroplated Ring with Smart IoT Spectrum Control.</span>
          </div>
        </div>
      </Html>

      {/* Interactive 3D Hotspot 2: Marble Table */}
      <Html position={[1.2, -1, 2]}>
        <div className="group relative cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-[#1A1917]/20 border border-[#1A1917] flex items-center justify-center animate-ping absolute inset-0" />
          <div className="w-6 h-6 rounded-full bg-[#1A1917] border border-white text-[10px] font-bold text-white flex items-center justify-center relative z-10 shadow-lg">
            2
          </div>
          <div className="absolute left-8 top-0 hidden group-hover:block w-48 p-3 rounded-xl bg-white border border-[#1A1917]/15 text-xs text-[#1A1917] backdrop-blur-md z-20 shadow-2xl">
            <span className="font-semibold text-[#1A1917] block">Calacatta Oro Marble</span>
            <span>Hand-quarried in Tuscany with satin seal finish.</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

export const ThreeRoomViewer: React.FC = () => {
  const [lightingMode, setLightingMode] = useState<'day' | 'dusk' | 'night'>('day');
  const [materialColor, setMaterialColor] = useState('#D8D2C6');

  const swatches = [
    { name: 'Warm Sand Bouclé', color: '#D8D2C6' },
    { name: 'Warm Espresso Leather', color: '#4A3B32' },
    { name: 'Soft Olive Velvet', color: '#3E4E42' },
    { name: 'Cream Linen', color: '#F4F0E8' },
  ];

  return (
    <section id="3d-viewer" className="py-24 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#1A1917]/10 text-[10px] uppercase tracking-[0.25em] text-[#8C6D3B] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
            <span>Interactive 3D Engine</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1917]">
            Rotate, Customize & <span className="italic text-gold-gradient">Explore Space</span>
          </h2>
        </div>
        <p className="text-sm text-[#5A5852] font-light max-w-md mt-4 md:mt-0">
          Experience interactive architectural visualization. Rotate room, toggle real-time lighting physics, and test bespoke material finishes.
        </p>
      </div>

      {/* Double Bezel Container enclosing 3D Canvas */}
      <div className="double-bezel relative overflow-hidden">
        <div className="double-bezel-inner h-[500px] sm:h-[650px] relative bg-[#FAF8F5]">

          {/* 3D Canvas Scene with Warm Ivory Background */}
          <Canvas shadows>
            <color attach="background" args={['#FAF8F5']} />
            <PerspectiveCamera makeDefault position={[6, 4, 9]} fov={50} />
            <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minDistance={4} maxDistance={14} />
            <ArchitecturalRoom lightingMode={lightingMode} materialColor={materialColor} />
          </Canvas>

          {/* Floating Canvas UI Controls overlay */}
          <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
            
            {/* Lighting Mode Selector */}
            <div className="glass-pill rounded-full p-1.5 flex items-center gap-1 pointer-events-auto shadow-md">
              <button
                onClick={() => setLightingMode('day')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                  lightingMode === 'day' ? 'bg-[#1A1917] text-white font-semibold' : 'text-[#1A1917]/70 hover:text-[#1A1917]'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Day
              </button>
              <button
                onClick={() => setLightingMode('dusk')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                  lightingMode === 'dusk' ? 'bg-[#A88B57] text-white font-semibold' : 'text-[#1A1917]/70 hover:text-[#1A1917]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Gold Dusk
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                  lightingMode === 'night' ? 'bg-[#1A1917] text-white font-semibold' : 'text-[#1A1917]/70 hover:text-[#1A1917]'
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Ambient Night
              </button>
            </div>

            {/* Instruction Badge */}
            <div className="glass-pill px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest text-[#1A1917]/70 flex items-center gap-2 shadow-md">
              <RotateCw className="w-3.5 h-3.5 text-[#A88B57] animate-spin" />
              <span>Drag to rotate • Pinch to zoom</span>
            </div>

          </div>

          {/* Bottom Swatch Selector */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 glass-pill p-4 rounded-2xl shadow-md">
            <span className="text-xs uppercase tracking-widest text-[#1A1917]/70 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A88B57]" />
              Material Finish:
            </span>
            <div className="flex items-center gap-3">
              {swatches.map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => setMaterialColor(swatch.color)}
                  className={`group relative w-8 h-8 rounded-full border-2 transition-transform ${
                    materialColor === swatch.color ? 'border-[#A88B57] scale-110' : 'border-[#1A1917]/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.color }}
                  title={swatch.name}
                >
                  {materialColor === swatch.color && (
                    <CheckCircle2 className="w-4 h-4 text-[#1A1917] absolute inset-0 m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
