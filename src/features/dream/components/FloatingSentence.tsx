import { Html } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type * as THREE from 'three';
import { MorphingWord, type MorphingWordHandle } from './MorphingWord';
import styles from '../DreamExperience.module.css';

export type FloatingSentenceHandle = {
  group: THREE.Group | null;
  letters: Array<THREE.Group | null>;
  portal: THREE.Group | null;
  portalRing: THREE.Mesh | null;
};

export const FloatingSentence = forwardRef<FloatingSentenceHandle>(function FloatingSentence(_, ref) {
  const group = useRef<THREE.Group>(null);
  const word = useRef<MorphingWordHandle>(null);
  useImperativeHandle(ref, () => ({
    group: group.current,
    letters: word.current?.letters ?? [],
    portal: word.current?.portal ?? null,
    portalRing: word.current?.portalRing ?? null
  }));

  return (
    <group ref={group} position={[0.58, 0.58, 0]} scale={[1.04, 1.04, 1.04]}>
      <Html
        transform
        center
        position={[-0.22, 0.28, 0]}
        distanceFactor={7.1}
        className={styles.spatialLead}
      >
        everything begins as an unfinished
      </Html>
      <MorphingWord ref={word} color="#1b1d15" />
    </group>
  );
});
