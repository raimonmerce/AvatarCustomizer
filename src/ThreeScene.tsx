import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelName, ModelSubtype, ModelInfo, ItemManager, BodyType, ModelType } from './ItemManager';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

type ThreeSceneProps = {
  selectedBodyType: BodyType;
  selectedAccessory: ModelName;
  selectedBottom: ModelName;
  selectedHairstly: ModelName;
  selectedShoe: ModelName;
  selectedTop: ModelName;
};

const ThreeScene = forwardRef((props: ThreeSceneProps, ref) => {

  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [headModel, setHeadModel] = useState<THREE.Object3D | null>(null);
  const [bodyModel, setBodyModel] = useState<THREE.Object3D | null>(null);
  const [accessoryModel, setAccessoryModel] = useState<THREE.Object3D | null>(null);
  const [bottomModel, setBottomModel] = useState<THREE.Object3D | null>(null);
  const [hairstlyModel, setHairstlyModel] = useState<THREE.Object3D | null>(null);
  const [shoeModel, setShoeModel] = useState<THREE.Object3D | null>(null);
  const [topModel, setTopModel] = useState<THREE.Object3D | null>(null);
  const itemManager = new ItemManager();

  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 215) / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize((window.innerWidth - 215), window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.9);
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
      camera.aspect = (window.innerWidth - 215) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize((window.innerWidth - 215), window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const getUrlGLB = (item: ModelInfo) => {
    if (props.selectedBodyType === BodyType.Female && item.urlF) return item.urlF
    else return item.urlM;
  }

  const removeModel = (currentModel: THREE.Object3D | null) => {
    if (!currentModel) return;
    if (currentModel.parent) {
      currentModel.parent.remove(currentModel);
    } else {
      scene?.remove(currentModel);
    }
  };

  const setModel = (modelInfo : ModelInfo, model : THREE.Object3D | null) => {
    if (modelInfo.type === ModelType.Body) {
      if (bodyModel) removeModel(bodyModel);
      setBodyModel(model);
    } else if (modelInfo.type === ModelType.Head) {
      if (headModel) removeModel(headModel);
      setHeadModel(model);
    } else if (modelInfo.type === ModelType.Garments) {
      if (modelInfo.subType === ModelSubtype.Accessory) {
        if (accessoryModel) removeModel(accessoryModel);
        setAccessoryModel(model);
      } else if (modelInfo.subType === ModelSubtype.Bottom) {
        if (bottomModel) removeModel(bottomModel);
        setBottomModel(model);
      } else if (modelInfo.subType === ModelSubtype.Hairstly) {
        if (hairstlyModel) removeModel(hairstlyModel);
        setHairstlyModel(model);
      } else if (modelInfo.subType === ModelSubtype.Shoe) {
        if (shoeModel) removeModel(shoeModel);
        setShoeModel(model);
      } else if (modelInfo.subType === ModelSubtype.Top) {
        if (topModel) removeModel(topModel);
        setTopModel(model);
      }
    }
  }

  const addModelInPlace = (modelChild : THREE.Object3D, modelFather : THREE.Object3D |null, unionName: string) => {
    const unionObject = modelFather?.getObjectByName(unionName);
    if (unionObject) unionObject.add(modelChild);
  } 

  const addModel = (modelInfo : ModelInfo, model : THREE.Object3D ) => {
    if (!scene) return;
    if (modelInfo.type === ModelType.Body) {
      scene.add(model);
    } else if (modelInfo.type === ModelType.Head) {
      addModelInPlace(model, bodyModel, 'Empty-Head');
    } else if (modelInfo.type === ModelType.Garments) {
      if (modelInfo.subType === ModelSubtype.Accessory) {
        bodyModel?.add(model);
      } else if (modelInfo.subType === ModelSubtype.Bottom) {
        addModelInPlace(model, bodyModel, 'UnionAvatars_Hips');
      } else if (modelInfo.subType === ModelSubtype.Hairstly) {
        addModelInPlace(model, headModel, 'UnionAvatars_Head');
      } else if (modelInfo.subType === ModelSubtype.Shoe) {
        addModelInPlace(model, bodyModel, 'UnionAvatars_Feet');
      } else if (modelInfo.subType === ModelSubtype.Top) {
        addModelInPlace(model, bodyModel, 'UnionAvatars_Chest');
      }
    }
  }

  const loadGLBModel = (modelName: ModelName) => {
    if (!scene) return;
    const itemToLoad = itemManager.getItem(modelName);
    if (!itemToLoad) {
      console.error(modelName, " item doesnt exist")
      return
    }
    if (itemToLoad.urlM === "") {
      setModel(itemToLoad, null);
      return;
    }
    let path = getUrlGLB(itemToLoad);
    if (!path) {
      console.error(modelName, " doesnt have GBL URL")
      return
    }
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
  
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader); 
    loader.load(
      path,
      (gltf) => {
        const loadedModel = gltf.scene;
        addModel(itemToLoad, loadedModel);
        setModel(itemToLoad, loadedModel);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error)
      }
    );
  };

  const downloadGLB = (): void => {
    const object = bodyModel;
    if (!object) {
        console.error('No object to export!');
        return;
    }

    if (object.type !== "Group" && object.type !== "Mesh") {
        console.error("Invalid object type for export:", object.type);
        return;
    }

    let fileName = 'model.glb';
    const exporter = new GLTFExporter();

    if (object.type === "Group") {
        console.log("Object is a group, containing the following children:", object.children);
    }

    try {
        exporter.parse(
            object,
            (result: ArrayBuffer | object) => {
                if (result instanceof ArrayBuffer) {
                    console.log("GLB export successful, size:", result.byteLength, "bytes");
                    const blob = new Blob([result], { type: 'model/gltf-binary' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href);
                    document.body.removeChild(link);
                } else {
                    console.error('Failed to export as GLB. Unexpected result type:', result);
                }
            },
            (error: any) => {
                console.error('GLTF Export failed with error:', error);
            },
            { binary: true }
        );
    } catch (error) {
        console.error("An unexpected error occurred during GLB export:", error);
    }
}

  useImperativeHandle(ref, () => ({
    downloadGLB,
  }));

  useEffect(() => {
    loadGLBModel(ModelName.Body)
  }, [props.selectedBodyType]);

  useEffect(() => {
    loadGLBModel(ModelName.Head)
    loadGLBModel(props.selectedAccessory);
    loadGLBModel(props.selectedBottom);
    loadGLBModel(props.selectedShoe);
    loadGLBModel(props.selectedTop);
  }, [bodyModel]);

  useEffect(() => {
    loadGLBModel(props.selectedHairstly);
  }, [headModel]);

  useEffect(() => {
    loadGLBModel(props.selectedAccessory);
  }, [props.selectedAccessory]);

  useEffect(() => {
    loadGLBModel(props.selectedBottom);
  }, [props.selectedBottom]);

  useEffect(() => {
    loadGLBModel(props.selectedHairstly,);
  }, [props.selectedHairstly]);

  useEffect(() => {
    loadGLBModel(props.selectedShoe);
  }, [props.selectedShoe]);

  useEffect(() => {
    loadGLBModel(props.selectedTop);
  }, [props.selectedTop]);

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
});

export default ThreeScene;