import { Text } from '@react-three/drei';
import type { DreamSceneConfig } from '../dreamScenes.config';

type PlaceholderSceneProps = {
  scene: DreamSceneConfig;
  position: [number, number, number];
};

export function PlaceholderScene({ scene, position }: PlaceholderSceneProps) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2.2, 1.22, 0.035]} />
        <meshBasicMaterial color="#171812" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[2.18, 0.01, 0.01]} />
        <meshBasicMaterial color="#171812" transparent opacity={0.22} />
      </mesh>
      <mesh position={[-1.1, 0, 0.03]}>
        <boxGeometry args={[0.01, 1.2, 0.01]} />
        <meshBasicMaterial color="#171812" transparent opacity={0.18} />
      </mesh>
      <Text
        position={[-0.9, 0.28, 0.05]}
        fontSize={0.12}
        anchorX="left"
        anchorY="middle"
        color="#171812"
        letterSpacing={0.12}
        material-transparent
        material-opacity={0.5}
        material-toneMapped={false}
      >
        {scene.index}
      </Text>
      <Text
        position={[-0.9, -0.04, 0.05]}
        fontSize={0.24}
        maxWidth={1.56}
        anchorX="left"
        anchorY="middle"
        color="#171812"
        material-transparent
        material-opacity={0.72}
        material-toneMapped={false}
      >
        {scene.label}
      </Text>
    </group>
  );
}
