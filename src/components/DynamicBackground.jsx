import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

function StarField() {
  const ref = useRef();
  const sphere = new Float32Array(5000)
    .fill(0)
    .map(() => (Math.random() - 0.5) * 10);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3}>
        <PointMaterial
          transparent
          color="#9b9bff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function DynamicBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#14141f]"
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>

      {/* Soft glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(90,90,255,0.15),transparent_70%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,100,200,0.1),transparent_80%)] mix-blend-screen" />
    </motion.div>
  );
}
