import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { skillGroups } from '../../data/portfolio';
import type { OrbitSkill } from '../../types';

interface OrbitConfig {
  radius: number;
  color: string;
  speed: number;
}

const ORBIT_CONFIG: Record<'inner' | 'mid' | 'outer', OrbitConfig> = {
  inner: { radius: 2.4, color: '#00f5ff', speed: 0.5 },
  mid: { radius: 3.7, color: '#7c3aed', speed: -0.34 },
  outer: { radius: 5, color: '#38bdf8', speed: 0.22 },
};

const ELLIPSE_Z = 0.55; // squash the orbit into an ellipse for depth

/** Flatten the grouped skills into individually positioned orbit objects. */
function useOrbitSkills(): OrbitSkill[] {
  return useMemo(() => {
    const result: OrbitSkill[] = [];
    for (const group of skillGroups) {
      const config = ORBIT_CONFIG[group.orbit];
      const step = (Math.PI * 2) / group.skills.length;
      group.skills.forEach((name, index) => {
        result.push({
          name,
          radius: config.radius,
          angle: step * index,
          yOffset: (index % 2 === 0 ? 1 : -1) * 0.35,
          speed: config.speed,
          color: config.color,
        });
      });
    }
    return result;
  }, []);
}

function SkillBadge({ skill }: { skill: OrbitSkill }): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime * skill.speed + skill.angle;
    group.position.x = Math.cos(t) * skill.radius;
    group.position.z = Math.sin(t) * skill.radius * ELLIPSE_Z;
    group.position.y =
      skill.yOffset + Math.sin(state.clock.elapsedTime + skill.angle) * 0.18;

    // Smoothly scale + brighten on hover (driven via refs, not state).
    const target = hovered ? 1.35 : 1;
    group.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        hovered ? 1.4 : 0.55,
        0.15,
      );
    }
  });

  return (
    <Billboard ref={groupRef}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[Math.max(1.1, skill.name.length * 0.16), 0.5]} />
        <meshStandardMaterial
          ref={matRef}
          color="#0d1224"
          emissive={skill.color}
          emissiveIntensity={0.55}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.2}
        color="#e7ecff"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {skill.name}
      </Text>
    </Billboard>
  );
}

/** Faint elliptical guide ring for an orbit. */
function OrbitRing({ radius, color }: { radius: number; color: string }): React.JSX.Element {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius * ELLIPSE_Z,
      0,
      Math.PI * 2,
      false,
      0,
    );
    return curve.getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y));
  }, [radius]);

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points],
  );

  return (
    <primitive
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.18,
          }),
        )
      }
    />
  );
}

function OrbitScene({ reducedMotion }: { reducedMotion: boolean }): React.JSX.Element {
  const skills = useOrbitSkills();
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (sceneRef.current && !reducedMotion) {
      sceneRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={sceneRef} rotation={[0.35, 0, 0]}>
      {(['inner', 'mid', 'outer'] as const).map((key) => (
        <OrbitRing
          key={key}
          radius={ORBIT_CONFIG[key].radius}
          color={ORBIT_CONFIG[key].color}
        />
      ))}
      {/* Glowing central sun. */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#0d1224"
          emissive="#00f5ff"
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {skills.map((skill) => (
        <SkillBadge key={skill.name} skill={skill} />
      ))}
    </group>
  );
}

interface SkillsOrbitProps {
  reducedMotion?: boolean;
}

/** Interactive "solar system of skills" canvas. */
function SkillsOrbit({ reducedMotion = false }: SkillsOrbitProps): React.JSX.Element {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2.6, 8.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={30} color="#00f5ff" />
      <pointLight position={[6, 4, 6]} intensity={20} color="#7c3aed" />
      <Suspense fallback={null}>
        <OrbitScene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default SkillsOrbit;
