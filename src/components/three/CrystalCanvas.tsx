import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Crystal({ reducedMotion }: { reducedMotion: boolean }): React.JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <Float enabled={!reducedMotion} speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.7, 0]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#00f5ff"
          emissiveIntensity={0.35}
          roughness={0.1}
          metalness={0.9}
          distort={0.25}
          speed={reducedMotion ? 0 : 1.5}
        />
      </mesh>
    </Float>
  );
}

/** Low-poly abstract crystal used beside the About bio. */
function CrystalCanvas({ reducedMotion = false }: { reducedMotion?: boolean }): React.JSX.Element {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#00f5ff" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#7c3aed" />
      <Suspense fallback={null}>
        <Crystal reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default CrystalCanvas;
