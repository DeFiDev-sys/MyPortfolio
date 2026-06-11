import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/** A stylised low-poly graduation cap (mortarboard). */
function GradCap({ reducedMotion }: { reducedMotion: boolean }): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float enabled={!reducedMotion} speed={2.5} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef} rotation={[0.2, 0, 0]}>
        {/* Cap base / head band */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.7, 0.85, 0.5, 32]} />
          <meshStandardMaterial color="#0d1224" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Flat mortarboard top */}
        <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.9, 0.08, 1.9]} />
          <meshStandardMaterial
            color="#0d1224"
            emissive="#7c3aed"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
        {/* Button on top */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.2} />
        </mesh>
        {/* Tassel */}
        <mesh position={[0.85, -0.1, 0.85]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function GradCapCanvas({ reducedMotion = false }: { reducedMotion?: boolean }): React.JSX.Element {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.5, 4.5], fov: 45 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 4, 3]} intensity={35} color="#00f5ff" />
      <pointLight position={[-3, -1, 2]} intensity={25} color="#7c3aed" />
      <Suspense fallback={null}>
        <GradCap reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default GradCapCanvas;
