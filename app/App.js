// App.js
import React from 'react';
import { Canvas } from '@react-three/fiber/native';
import { View } from 'react-native';
import { OrbitControls } from '@react-three/drei/native';

function Box() {
  return (
    <mesh rotation={[90, 0, 20]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>
    </View>
  );
}
