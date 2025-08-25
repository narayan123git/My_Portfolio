import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import React, { Suspense } from 'react';
import { Room } from './room';
import HeroLights from './HeroLights';
import Particle from './Particle';
import Particles from './Particle';

const HeroExp = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Canvas camera={{ position: isMobile ? [0, 10, 15] : [0, 0, 15], fov: isMobile ? 60 : 45 }}>
      <HeroLights />
      <Particles count={100}/>
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={isMobile ? 30 : 20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      {/* ✅ This is the fix */}
      <Suspense fallback={null}>
        <group
          scale={isMobile ? 1.7 : 1}
          position={[0, isMobile ? -1 : -3.5, isMobile ? 4 : 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExp;
