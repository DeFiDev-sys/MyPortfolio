import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  /** Number of particles to spawn. */
  count?: number;
  /** Base color of the particles. */
  color?: string;
  /** Radius of the spherical volume particles fill. */
  radius?: number;
}

/**
 * A slowly drifting cloud of points used as a 3D background layer.
 * Geometry and material are disposed on unmount to avoid GPU leaks.
 */
function ParticleField({
  count = 2200,
  color = '#00f5ff',
  radius = 9,
}: ParticleFieldProps): React.JSX.Element {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a stable random distribution inside a sphere once.
  const positions = useMemo<Float32Array>(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = r * Math.cos(phi);
    }
    return array;
  }, [count, radius]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    points.rotation.y += delta * 0.04;
    points.rotation.x += delta * 0.015;
  });

  // Explicitly dispose buffers + material when this component unmounts.
  useEffect(() => {
    const points = pointsRef.current;
    return () => {
      points?.geometry.dispose();
      const material = points?.material;
      if (material) (material as THREE.Material).dispose();
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default ParticleField;
