import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';

/**
 * The glowing wireframe icosahedron at the heart of the hero scene.
 * Rotates continuously and pulses its emissive intensity.
 */
function GlowIcosahedron(): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * 0.25;
      group.rotation.x += delta * 0.12;
    }
    // Pulse the inner glow on a sine wave.
    const mat = coreMatRef.current;
    if (mat) {
      const pulse = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
      mat.emissiveIntensity = 0.4 + pulse * 1.1;
    }
  });

  // Dispose generated geometry/material on unmount.
  useEffect(() => {
    const wire = wireRef.current;
    return () => {
      wire?.geometry.dispose();
      (wire?.material as THREE.Material | undefined)?.dispose();
    };
  }, []);

  return (
    <group ref={groupRef}>
      {/* Solid, softly glowing core. */}
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          ref={coreMatRef}
          color="#0d1224"
          emissive="#00f5ff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Bright cyan wireframe overlay. */}
      <lineSegments ref={wireRef} scale={1.02}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.6, 1)]} />
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.6} />
      </lineSegments>

      {/* Violet outer halo. */}
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

interface HeroCanvasProps {
  /** Disable interaction + auto-rotation for reduced-motion users. */
  reducedMotion?: boolean;
}

/**
 * Full-viewport background canvas for the hero section: a pulsing wireframe
 * icosahedron floating inside a drifting particle field. Mouse-tracked
 * rotation is provided by drei's PresentationControls.
 */
function HeroCanvas({ reducedMotion = false }: HeroCanvasProps): React.JSX.Element {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#00f5ff" />
      <pointLight position={[-5, -3, 2]} intensity={40} color="#7c3aed" />

      <Suspense fallback={null}>
        <ParticleField count={2200} />
        <PresentationControls
          enabled={!reducedMotion}
          global
          cursor={false}
          snap
          speed={1.2}
          polar={[-0.3, 0.3]}
          azimuth={[-0.5, 0.5]}
        >
          <Float
            enabled={!reducedMotion}
            speed={2}
            rotationIntensity={0.6}
            floatIntensity={0.8}
          >
            <GlowIcosahedron />
          </Float>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}

export default HeroCanvas;
