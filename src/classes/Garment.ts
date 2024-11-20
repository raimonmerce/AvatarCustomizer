import { ModelName, ModelSubtype, ModelType, BodyType } from '../ItemManager';
import Item from './Item';
import * as THREE from 'three';


export default class Garment extends Item {
    private bodyParts: string[];
    private cameraPosition: [THREE.Vector3, THREE.Vector3];
    private urlMJson?: string;
    private urlFJson?: string;

    constructor(
        type: ModelType,
        name: ModelName,
        urlM: string,
        bodyType: BodyType,
        bodyParts: string[],
        cameraPosition: [THREE.Vector3, THREE.Vector3],
        subType?: ModelSubtype,
        urlF?: string,
        urlFJson?: string,
        urlMJson?: string,
    ) {
        super(type, name, urlM, bodyType, subType, urlF);
        this.bodyParts = bodyParts;
        this.cameraPosition = cameraPosition;
        this.urlMJson = urlMJson;
        this.urlFJson = urlFJson;
    }

    public getBodyParts(): string[] {
        return this.bodyParts;
    }

    public getCameraPosition(): [THREE.Vector3, THREE.Vector3] {
        return this.cameraPosition;
    }

    public async getMetadata() : Promise<any | null> {
        if (!this.urlMJson || !this.urlFJson) return null;
        const response = await fetch(this.getBodyType() === BodyType.Male ? this.urlMJson : this.urlFJson);
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
}