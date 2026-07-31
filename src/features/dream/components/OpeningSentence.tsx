import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import type * as THREE from 'three';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getOpeningPhases, getThoughtLetterTransform, thoughtLetters } from '../timeline/openingTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import styles from '../DreamExperience.module.css';

type OpeningSentenceProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
};

export function OpeningSentence({ pointer }: OpeningSentenceProps) {
  const group = useRef<THREE.Group>(null);
  const stable = useRef<THREE.Group>(null);
  const letterRefs = useRef<Array<THREE.Group | null>>([]);
  const portal = useRef<THREE.Group>(null);
  const portalMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const voidMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);
    const suspended = Math.sin(clock.elapsedTime * 0.42) * 0.018;

    if (group.current) {
      group.current.visible = phases.darkExit < 0.55;
      group.current.position.y = 0.32 + suspended - phases.cameraPassage * 0.22;
      group.current.rotation.x += (pointer.current.y * 0.018 - group.current.rotation.x) * 0.04;
      group.current.rotation.y += (pointer.current.x * 0.028 - group.current.rotation.y) * 0.04;
    }

    if (stable.current) {
      stable.current.position.z = -phases.cameraApproach * 0.18;
      stable.current.scale.setScalar(1 - phases.cameraPassage * 0.08);
    }

    thoughtLetters.forEach((_, index) => {
      const letter = letterRefs.current[index];
      if (!letter) return;

      const transform = getThoughtLetterTransform(index, phases.destabilize, phases.portalFormation);
      letter.position.set(thoughtLetters[index].x + transform.x, transform.y, transform.z);
      letter.rotation.set(transform.rotateX, transform.rotateY, transform.rotateZ);
      letter.scale.set(transform.scaleX, transform.scaleY, 1 + transform.z * 0.1);
    });

    if (portal.current) {
      const scale = 1 + phases.portalFormation * 2.4 + phases.cameraPassage * 5.5;
      portal.current.scale.set(scale, scale, 1 + phases.portalFormation * 1.8 + phases.cameraPassage * 2.2);
      portal.current.position.z = 0.02 + phases.portalFormation * 0.16 + phases.cameraPassage * 1.2;
    }

    if (portalMaterial.current) {
      portalMaterial.current.color.set(phases.cameraPassage > 0.4 ? '#2f302b' : '#d9d2c3');
      portalMaterial.current.roughness = 0.86;
      portalMaterial.current.opacity = 0.28 + phases.portalFormation * 0.55;
    }

    if (voidMaterial.current) {
      voidMaterial.current.opacity = phases.portalFormation * 0.45 + phases.cameraPassage * 0.42;
    }
  });

  return (
    <group ref={group} position={[0.18, 0.32, 0]}>
      <group ref={stable}>
        <Html transform center position={[-0.48, 0.34, 0]} distanceFactor={7.4} className={styles.spatialLead}>
          everything begins as an unfinished
        </Html>
      </group>
      <group position={[0.02, -0.42, 0]}>
        {thoughtLetters.map((letter, index) => (
          <group
            key={letter.value + index}
            ref={(node) => {
              letterRefs.current[index] = node;
            }}
            position={[letter.x, 0, 0]}
          >
            <Html transform center distanceFactor={7.4} className={styles.spatialLetter}>
              {letter.value}
            </Html>
            <mesh position={[0, -0.02, -0.035]}>
              <boxGeometry args={[0.32, 0.74, 0.06]} />
              <meshStandardMaterial color="#d9d2c3" roughness={0.92} transparent opacity={0.08} />
            </mesh>
            {letter.value === 'o' && index === 2 ? (
              <group ref={portal}>
                <mesh>
                  <torusGeometry args={[0.34, 0.052, 32, 96]} />
                  <meshStandardMaterial ref={portalMaterial} color="#d9d2c3" roughness={0.86} transparent opacity={0.32} />
                </mesh>
                <mesh position={[0, 0, -0.06]} scale={[1.34, 1.34, 1]}>
                  <torusGeometry args={[0.34, 0.015, 24, 96]} />
                  <meshStandardMaterial color="#a7a08f" roughness={0.94} transparent opacity={0.18} />
                </mesh>
                <mesh position={[0, 0, -0.1]}>
                  <circleGeometry args={[0.29, 64]} />
                  <meshBasicMaterial ref={voidMaterial} color="#050605" transparent opacity={0} />
                </mesh>
              </group>
            ) : null}
          </group>
        ))}
      </group>
    </group>
  );
}
