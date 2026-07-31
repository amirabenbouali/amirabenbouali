import { Html } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type * as THREE from 'three';
import { LetterPortal, type LetterPortalHandle } from './LetterPortal';
import styles from '../DreamExperience.module.css';

export type MorphingWordHandle = {
  letters: Array<THREE.Group | null>;
  portal: THREE.Group | null;
  portalRing: THREE.Mesh | null;
};

const letters = [
  { value: 't', x: -1.92 },
  { value: 'h', x: -1.24 },
  { value: 'o', x: -0.5, portal: true },
  { value: 'u', x: 0.28 },
  { value: 'g', x: 1.03 },
  { value: 'h', x: 1.78 },
  { value: 't', x: 2.47 }
];

type MorphingWordProps = {
  color: string;
};

export const MorphingWord = forwardRef<MorphingWordHandle, MorphingWordProps>(function MorphingWord({ color }, ref) {
  const letterRefs = useRef<Array<THREE.Group | null>>([]);
  const portalRef = useRef<LetterPortalHandle>(null);

  useImperativeHandle(ref, () => ({
    letters: letterRefs.current,
    portal: portalRef.current?.group ?? null,
    portalRing: portalRef.current?.ring ?? null
  }));

  return (
    <group position={[0.18, -0.92, 0]}>
      {letters.map((letter, index) => {
        if (letter.portal) {
          return (
            <group ref={(node) => (letterRefs.current[index] = node)} key={letter.value + index} position={[letter.x, 0, 0]}>
              <LetterPortal ref={portalRef} position={[0, 0, 0]} color={color} />
            </group>
          );
        }

        return (
          <group ref={(node) => (letterRefs.current[index] = node)} key={letter.value + index} position={[letter.x, 0, 0]}>
            <Html
              transform
              center
              distanceFactor={7.1}
              className={styles.spatialLetter}
              style={{ color }}
            >
              {letter.value}
            </Html>
          </group>
        );
      })}
    </group>
  );
});
