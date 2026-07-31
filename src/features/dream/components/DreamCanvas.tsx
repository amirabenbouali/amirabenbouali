import { Canvas } from '@react-three/fiber';
import { Component, Suspense, useState } from 'react';
import type { MutableRefObject, ReactNode, RefObject } from 'react';
import { DreamScene } from './DreamScene';
import type { PointerInfluenceRef } from './PointerInfluence';
import { WebGLFallback } from './WebGLFallback';
import styles from '../DreamExperience.module.css';

type DreamCanvasProps = {
  rootRef: RefObject<HTMLElement>;
  pointer: MutableRefObject<PointerInfluenceRef>;
  onLoaded: () => void;
};

class DreamErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <WebGLFallback />;
    }

    return this.props.children;
  }
}

function canUseWebGL() {
  if (typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')) {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function DreamCanvas({ rootRef, pointer, onLoaded }: DreamCanvasProps) {
  const [webglAvailable] = useState(() => (typeof document === 'undefined' ? true : canUseWebGL()));

  if (!webglAvailable) {
    return <WebGLFallback />;
  }

  return (
    <DreamErrorBoundary>
      <Canvas
        className={styles.canvas}
        dpr={[1, 1.45]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#e4dfd2');
          onLoaded();
        }}
      >
        <Suspense fallback={null}>
          <DreamScene rootRef={rootRef} pointer={pointer} />
        </Suspense>
      </Canvas>
    </DreamErrorBoundary>
  );
}
