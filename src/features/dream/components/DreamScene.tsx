import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { dreamScenes } from '../dreamScenes.config';
import { getOpeningPhases } from '../timeline/openingTimeline';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import { AtriaWorld } from './AtriaWorld';
import { AmbientWorld } from './AmbientWorld';
import { AtmosphericLighting } from './AtmosphericLighting';
import { DreamCamera } from './DreamCamera';
import { LetterPassage } from './LetterPassage';
import { OpeningSentence } from './OpeningSentence';
import { PlaceholderScene } from './PlaceholderScene';
import { FoundryWorld } from './FoundryWorld';
import type { QualityTier } from '../hooks/useViewportQuality';
import type { useAtriaState } from '../atria/useAtriaState';
import type { useFoundryState } from '../foundry/useFoundryState';
import type { MutableRefObject } from 'react';

type DreamSceneProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
  quality: QualityTier;
  atria: ReturnType<typeof useAtriaState>;
  foundry: ReturnType<typeof useFoundryState>;
  isActive: boolean;
};

export function DreamScene({ pointer, quality, atria, foundry, isActive }: DreamSceneProps) {
  const pale = useMemo(() => new THREE.Color('#ece7dd'), []);
  const dark = useMemo(() => new THREE.Color('#050605'), []);
  const current = useMemo(() => new THREE.Color('#ece7dd'), []);

  useFrame(({ scene }) => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);
    current.copy(pale).lerp(dark, phases.darkExit);
    scene.background = current;

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(current);
      scene.fog.near = 7 - phases.darkExit * 3;
      scene.fog.far = 38 - phases.darkExit * 16;
    }
  });

  return (
    <>
      <color attach="background" args={['#ece7dd']} />
      <fog attach="fog" args={['#ece7dd', 8, 38]} />
      <DreamCamera pointer={pointer} isActive={isActive} />
      <AtmosphericLighting pointer={pointer} />
      <AmbientWorld quality={quality} isActive={isActive} />
      <OpeningSentence pointer={pointer} />
      <LetterPassage />
      <AtriaWorld pointer={pointer} quality={quality} atria={atria} isActive={isActive} />
      <FoundryWorld pointer={pointer} quality={quality} foundry={foundry} isActive={isActive} />
      {dreamScenes.slice(4).map((scene, index) => (
        <PlaceholderScene key={scene.id} scene={scene} position={[index % 2 === 0 ? -0.72 : 0.72, -0.4, -18 - index * 4.2]} />
      ))}
    </>
  );
}
