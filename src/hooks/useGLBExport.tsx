import { useRef } from 'react';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

export const useGLBExport = (bodyModel: THREE.Object3D | null) => {
  const downloadGLB = () => {
    if (!bodyModel) return;

    const exporter = new GLTFExporter();
    exporter.parse(
      bodyModel,
      (result: ArrayBuffer | object) => {
        if (result instanceof ArrayBuffer) {
          const blob = new Blob([result], { type: 'model/gltf-binary' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'model.glb';
          link.click();
          URL.revokeObjectURL(link.href);
        }
      },
        (error: any) => {
            console.error('GLTF Export failed with error:', error);
        },
        { binary: true }
    );
  };

  return { downloadGLB };
};