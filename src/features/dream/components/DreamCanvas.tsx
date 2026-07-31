import { Canvas } from '@react-three/fiber';
import { Component, Suspense } from 'react';
import type { MutableRefObject, ReactNode } from 'react';
import type { QualityTier } from '../hooks/useViewportQuality';
import { getPixelRatioForQuality } from '../hooks/useViewportQuality';
import type { useAtriaState } from '../atria/useAtriaState';
import type { useFoundryState } from '../foundry/useFoundryState';
import { DreamScene } from './DreamScene';
import type { PointerInfluenceRef } from './PointerInfluence';
import { WebGLFallback } from './WebGLFallback';
import styles from '../DreamExperience.module.css';

type DreamCanvasProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
  quality: QualityTier;
  atria: ReturnType<typeof useAtriaState>;
  foundry: ReturnType<typeof useFoundryState>;
  isActive: boolean;
  webglSupported: boolean;
  onLoaded: () => void;
  onError: (error: unknown) => void;
};

class DreamErrorBoundary extends Component<
  {
    children: ReactNode;
    onError: (error: unknown) => void;
    atria: ReturnType<typeof useAtriaState>;
    foundry: ReturnType<typeof useFoundryState>;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return <WebGLFallback reason="error" atria={this.props.atria} foundry={this.props.foundry} />;
    }

    return this.props.children;
  }
}

export function DreamCanvas({ pointer, quality, atria, foundry, isActive, webglSupported, onLoaded, onError }: DreamCanvasProps) {
  if (!webglSupported) {
    return <WebGLFallback reason="unsupported" atria={atria} foundry={foundry} />;
  }

  const pixelRatio = getPixelRatioForQuality(quality);

  return (
    <DreamErrorBoundary onError={onError} atria={atria} foundry={foundry}>
      <Canvas
        className={styles.canvas}
        dpr={[1, pixelRatio]}
        gl={{ antialias: quality !== 'low', powerPreference: 'high-performance', alpha: false }}
        frameloop={isActive ? 'always' : 'demand'}
        onCreated={({ gl }) => {
          gl.setClearColor('#ece7dd');
          onLoaded();
        }}
      >
        <Suspense fallback={null}>
          <DreamScene pointer={pointer} quality={quality} atria={atria} foundry={foundry} isActive={isActive} />
        </Suspense>
      </Canvas>
    </DreamErrorBoundary>
  );
}
