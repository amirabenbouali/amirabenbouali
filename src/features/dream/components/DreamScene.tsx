import { dreamScenes } from '../dreamScenes.config';
import type { PointerInfluenceRef } from './PointerInfluence';
import { AmbientWorld } from './AmbientWorld';
import { AtmosphericLighting } from './AtmosphericLighting';
import { DreamCamera } from './DreamCamera';
import { PlaceholderScene } from './PlaceholderScene';
import type { QualityTier } from '../hooks/useViewportQuality';
import type { MutableRefObject } from 'react';

type DreamSceneProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
  quality: QualityTier;
  isActive: boolean;
};

export function DreamScene({ pointer, quality, isActive }: DreamSceneProps) {
  return (
    <>
      <color attach="background" args={['#ece7dd']} />
      <fog attach="fog" args={['#ece7dd', 8, 38]} />
      <DreamCamera pointer={pointer} isActive={isActive} />
      <AtmosphericLighting pointer={pointer} />
      <AmbientWorld quality={quality} isActive={isActive} />
      {dreamScenes.map((scene, index) => (
        <PlaceholderScene key={scene.id} scene={scene} position={[index % 2 === 0 ? -0.72 : 0.72, 0.08, -index * 4.2]} />
      ))}
    </>
  );
}
