import * as THREE from 'three';

export enum ModelName {
    //Main
    Head = 'Head',
    Body = 'Body',
    //Accessories
    Mask = 'Mask',
    Glasses = 'Glasses',
    Headphone = 'Headphones',
    Headwear = 'Headwear',
    EmptyAccessory = "No accessories",
    //Bottom
    PantsCargo = 'Cargo pants',
    PantsFormal = 'Formal pants',
    PantsShorts = 'Short pants',
    SkirtMini = 'Mini Skirt',
    EmptyBottom = "No bottom",
    //Hairstly
    Hair04 = 'Haircut 1',
    Hair08 = 'Haircut 2',
    Hair12 = 'Haircut 3',
    Hair14 = 'Haircut 4',
    Poly08 = 'Haircut 5',
    Poly12 = 'Haircut 6',
    Poly16 = 'Haircut 7',
    Poly18 = 'Haircut 8',
    EmptyHairstly = "No haircut",
    //Shoe
    Sandals = 'Sandals',
    SneakerAir = 'Sneaker AirForce',
    SneakerCon = 'Sneaker Converse',
    SneakerYee = 'Sneaker Yeezy',
    EmptyShoe = "No shoes",
    //Top
    BlazerHitman = 'Hitman blazer',
    HoodieKangaroo = 'Kangaroo hoodie',
    PufferBasic = 'Basic puffer',
    ShirtBasic = 'Basic shirt',
    EmptyTop = "No top"
  
  }
  
  export enum ModelType {
    Head = 'head',
    Body = 'body',
    Garments = 'garments',
  }
  
  export enum ModelSubtype {
    Accessory = 'accessory',
    Bottom = 'bottom',
    Hairstly = 'hairstly',
    Shoe = 'shoe',
    Top = 'top',
  }
  
  export interface ModelInfo {
    type: ModelType;
    subType?: ModelSubtype;
    name: ModelName;
    urlM: string;
    urlF?: string;
    urlMJson?: string;
    urlFJson?: string;
  }
  
  export enum BodyType {
    Male = 'Male',
    Female = 'Female',
  }
  
  export const BodyParts: Record<ModelSubtype, string[]>  = {
    [ModelSubtype.Accessory] : [],
    [ModelSubtype.Bottom] : ["UnionAvatars_Hips", "UnionAvatars_Legs_bottom", "UnionAvatars_Legs_top"],
    [ModelSubtype.Hairstly] : [],
    [ModelSubtype.Shoe] : ["UnionAvatars_Feet"],
    [ModelSubtype.Top] : ["UnionAvatars_Chest", "UnionAvatars_Belly", "UnionAvatars_Arms_bottom", "UnionAvatars_Arms_top"],
  }
  
  export const CameraPositions: Record<ModelSubtype, [THREE.Vector3, THREE.Vector3]>  = {
    [ModelSubtype.Accessory] : [new THREE.Vector3(0, 1.72, 0.5), new THREE.Vector3(0, 1.72, 0)],
    [ModelSubtype.Bottom] : [new THREE.Vector3(0, 0.6, 0.9), new THREE.Vector3(0, 0.6, 0)],
    [ModelSubtype.Hairstly] : [new THREE.Vector3(0, 1.72, 0.5), new THREE.Vector3(0, 1.72, 0)],
    [ModelSubtype.Shoe] : [new THREE.Vector3(0.0, 0.3, 0.4), new THREE.Vector3(0, 0.0, 0)],
    [ModelSubtype.Top] : [new THREE.Vector3(0, 1.28, 0.72), new THREE.Vector3(0, 1.28, 0)],
  }