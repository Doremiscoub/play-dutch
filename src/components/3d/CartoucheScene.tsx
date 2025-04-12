
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { CartoucheAvatar } from './CartoucheAvatar';

interface CartoucheSceneProps {
  className?: string;
}

export default function CartoucheScene({ className = '' }: CartoucheSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-white/50 rounded-full">Chargement...</div>}>
        <Canvas shadows className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Stage environment="studio" intensity={0.6}>
            <CartoucheAvatar scale={1.5} />
          </Stage>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={1.5} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
