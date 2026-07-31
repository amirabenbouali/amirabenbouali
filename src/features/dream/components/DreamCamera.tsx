import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { forwardRef } from 'react';
import type * as THREE from 'three';

type DreamCameraProps = {
  target: THREE.Vector3;
};

export const DreamCamera = forwardRef<THREE.PerspectiveCamera, DreamCameraProps>(function DreamCamera({ target }, ref) {
  useFrame(({ camera }) => {
    camera.lookAt(target);
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0.18, 7.4]} fov={48} near={0.05} far={90} />;
});
