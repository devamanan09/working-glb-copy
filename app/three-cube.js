import React from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Asset } from 'expo-asset';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function HandViewer() {
  const loadModel = async (scene, filePath, positionX, isMirror) => {
    const modelAsset = Asset.fromModule(filePath);
    await modelAsset.downloadAsync();
    const uri = modelAsset.localUri || modelAsset.uri;

    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(
        uri,
        (gltf) => {
          const model = gltf.scene;
          
          // Mirror the model if required
          if (isMirror) {
            model.scale.x = -1; // Flip the model along the X-axis
            model.rotation.y = Math.PI; // Rotate 180 degrees along the Y-axis to correct orientation
          }

          // Adjust position and rotation for a more natural hand posture
          model.position.set(positionX, -0.5, 0); // Slightly lower the hands
          model.rotation.set(0, isMirror ? Math.PI / 8 : -Math.PI / 8, 0); // Rotate hands slightly inward

          model.scale.set(0.5, 0.5, 0.5); // Adjust scale if needed
          scene.add(model);
          resolve(model);
        },
        undefined,
        (error) => {
          console.error(`Error loading ${filePath}:`, error);
          reject(error);
        }
      );
    });
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        // 🛠️ Zoom out 20 times by setting the camera's z position to 20
        camera.position.set(0, 0, 20); // Set Z to 20 for 20x zoom out

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 6).normalize();
        scene.add(light);

        // 🖐️ Load left and right hand models with increased separation by 2 cm
        await loadModel(scene, require('../assets/models/left-hand.glb'), -1.22, false);  // Left hand, placed on the left
        await loadModel(scene, require('../assets/models/untitled.glb'), 1.22, false); // Right hand, placed on the right

        // 🎞️ Animate
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };

        animate();
      }}
    />
  );
}
