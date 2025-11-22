'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  RoundedBox,
  Float,
  Environment,
  ContactShadows,
  // PresentationControls,
  SpotLight,
  Instances,
  Instance,
} from '@react-three/drei';
import { Mesh } from 'three';

// Data for the instanced text blocks
const textBlocks = [
  // { position: [x, y, z], scale: [width, height, depth] }
  { position: [-0.8, 1.6, 0.06], scale: [1, 0.2, 0.02] },
  { position: [0, 1.2, 0.06], scale: [1.5, 0.15, 0.02] },
  { position: [0, 0.6, 0.06], scale: [2.5, 0.05, 0.02] },
  { position: [0, 0.4, 0.06], scale: [2.5, 0.05, 0.02] },
  { position: [0, 0.2, 0.06], scale: [2, 0.05, 0.02] },
  { position: [0, -0.5, 0.06], scale: [1.8, 0.1, 0.02] },
  { position: [0, -0.8, 0.06], scale: [2.5, 0.05, 0.02] },
  { position: [0, -1.0, 0.06], scale: [2.2, 0.05, 0.02] },
];

// Sub-component for the 3D resume mesh
const ResumeMesh = () => {
  const meshRef = useRef<Mesh>(null!);

  return (
    <group>
      {/* The paper */}
      <RoundedBox
        ref={meshRef}
        args={[3, 4, 0.1]} // width, height, depth
        radius={0.05} // corner radius
        smoothness={4}
      >
        <meshStandardMaterial
          color="#fafafa"
          roughness={0.9}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Instanced Procedural Content Blocks for performance */}
      <Instances>
        <boxGeometry />
        <meshStandardMaterial color="#d4d4d8" />
        {textBlocks.map((block, i) => (
          <Instance
            key={i}
            position={block.position as [number, number, number]}
            scale={block.scale as [number, number, number]}
          />
        ))}
      </Instances>
    </group>
  );
};

// Main Hero3D component
const Hero3D = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.5], fov: 35 }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <SpotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
        // Optimized shadow map size
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0.1, -0.2, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      > */}
        <Float
          rotationIntensity={0.4}
          floatIntensity={2}
          speed={1.5}
        >
          <ResumeMesh />
        </Float>
      {/* </PresentationControls> */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.75}
        scale={10}
        blur={2.5}
        far={3}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Hero3D;
