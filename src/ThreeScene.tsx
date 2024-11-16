import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelName, ModelSubtype, ModelInfo, ItemManager, BodyType, ModelType } from './ItemManager';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; // Import DRACOLoader
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

type ThreeSceneProps = {
  bodyType: BodyType;
};

const ThreeScene: React.FC<ThreeSceneProps> = ({ bodyType }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [headModel, setHeadModel] = useState<THREE.Object3D | null>(null);
  const [bodyModel, setBodyModel] = useState<THREE.Object3D | null>(null);
  const itemManager = new ItemManager();

  const controlsRef = useRef<OrbitControls | null>(null); // Reference for OrbitControls

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.screenSpacePanning = true;
    controls.maxDistance = 3;
    controls.minDistance = 1;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;

    const target = new THREE.Vector3(0, 1, 0);
    controls.target.copy(target);
    camera.lookAt(target);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);
    controlsRef.current = controls;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);


  const loadBodyModel = (bodyType: BodyType) => {
    loadGLBModel(ModelName.Body, bodyType)
  }

  const getUrlGLB = (item: ModelInfo, bodyType: BodyType) => {
    if (bodyType === BodyType.Female && item.urlF) return item.urlF
    else return item.urlM;
  }

  const setModel = (modelInfo : ModelInfo, model : THREE.Object3D) => {
    if (modelInfo.type === ModelType.Body) {
      if (bodyModel) scene?.remove(bodyModel);
      setBodyModel(model);
    }
    else if (modelInfo.type === ModelType.Head) setHeadModel(model);
  }

  const getModelPosition = (modelInfo : ModelInfo): THREE.Vector3  => {
    if (modelInfo.type === ModelType.Body) return new THREE.Vector3(0, 0, 0);
    else if (modelInfo.type === ModelType.Head) {
      const emptyHead = bodyModel?.getObjectByName('Empty-Head');
      if (emptyHead?.position) return emptyHead.position.clone();
    }
    return new THREE.Vector3(0, 0, 0);
  }

  const loadGLBModel = (modelName: ModelName, bodyType: BodyType) => {
    if (!scene) {
      console.error("Scene doesnt exist")
      return
    }
    const itemToLoad = itemManager.findItemByName(modelName);
    if (!itemToLoad) {
      console.error(modelName, " item doesnt exist")
      return
    }
    let path = getUrlGLB(itemToLoad, bodyType);
    console.log("path", path)
    if (!path) {
      console.error(modelName, " doesnt have GBL URL")
      return
    }
    const dracoLoader = new DRACOLoader();
    // Set the path where Draco decoder files are located (make sure the path is correct)
    dracoLoader.setDecoderPath('path/to/draco/'); // Specify the correct path
  
    // Create a new GLTFLoader and set the DRACOLoader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader); 
    loader.load(
      path,
      (gltf) => {
        const loadedModel = gltf.scene;
        const position = getModelPosition(itemToLoad);
        loadedModel.position.copy(position);
        scene.add(loadedModel);
        setModel(itemToLoad, loadedModel);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  };

  useEffect(() => {
    if (bodyType) loadBodyModel(bodyType);
  }, [bodyType]);

  useEffect(() => {
    loadGLBModel(ModelName.Head, bodyType)
  }, [bodyModel]);


  // Animation loop
  useEffect(() => {
    if (!renderer || !scene || !camera) return;

    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);
    };

    animate();
  }, [renderer, scene, camera]);

  return <div ref={mountRef} />;
};

export default ThreeScene;