import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [cubes, setCubes] = useState<THREE.Mesh[]>([]);

  // Initialize scene, camera, and renderer
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [renderer, camera]);

  // Animation loop
  useEffect(() => {
    if (!renderer || !scene || !camera) return;

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube) => (cube.rotation.x += 0.01));
      renderer.render(scene, camera);
    };

    animate();
  }, [renderer, scene, camera, cubes]);

  // Function to add a new cube
  const addCube = () => {
    if (!scene) return;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.x = (Math.random() - 0.5) * 4;
    cube.position.y = (Math.random() - 0.5) * 4;
    cube.position.z = (Math.random() - 0.5) * 4;

    scene.add(cube);
    setCubes((prevCubes) => [...prevCubes, cube]);
  };

  return (
    <>
      <button onClick={addCube} style={{ position: 'absolute', zIndex: 1, margin: 10 }}>
        Spawn Cube
      </button>
      <div ref={mountRef}></div>
    </>
  );
};

export default ThreeScene;