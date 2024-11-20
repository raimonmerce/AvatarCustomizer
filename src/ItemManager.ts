import Item from './classes/Item';
import Garment from './classes/Garment';
import {ModelName, ModelType, ModelSubtype, BodyType, ModelInfo, BodyParts, CameraPositions} from './ModelEnums'
import { itemsMap } from './ItemsMap'

export default class ItemManager {
  private items: Record<ModelName, Item | null>;

  constructor() {
    this.items = this.generateItems(itemsMap, BodyType.Male);
  }

  private generateItems(itemsMap: Record<ModelName, ModelInfo | null>, bodyType: BodyType): Record<ModelName, Item | null> {
    let items: Partial<Record<ModelName, Item | null>> = {};
    Object.entries(itemsMap).forEach(([name, modelInfo]) => {
        if (modelInfo) {
            const { type, subType, urlM, urlF, urlMJson, urlFJson } = modelInfo;
            if (type === ModelType.Garments && subType){
              items[name as ModelName] = new Garment(
                type as ModelType,
                name as ModelName,
                urlM,
                bodyType as BodyType,
                BodyParts[subType as ModelSubtype],
                CameraPositions[subType as ModelSubtype],
                subType as ModelSubtype,
                urlF,
                urlMJson,
                urlFJson
              );
            } else {
              items[name as ModelName] = new Item(
                type,
                name as ModelName,
                urlM,
                bodyType,
                subType,
                urlF,
              );
            }
        }
    });
    return items as Record<ModelName, Item>;
  }

  getItem(name: ModelName): Item | null {
    return this.items[name] || null;
  }

  getItemsByType(type: ModelType): Item[] {
      return Object.values(this.items).filter((item): item is Item => item !== null && item.getType() === type);
  }

  getItemsBySubtype(subType: ModelSubtype): Item[] {
      return Object.values(this.items).filter((item): item is Item => item !== null && item.getSubtype() === subType);
  }

  getNamesBySubtype(subType: ModelSubtype): ModelName[] {
      return Object.values(this.items)
          .filter((item): item is Item => item !== null && item.getSubtype() === subType)
          .map(item => item.getName());
  }

  getModelNameFromString(modelName: string): ModelName {
    if (Object.values(ModelName).includes(modelName as ModelName)) {
      return modelName as ModelName;
    }
    return ModelName.EmptyShoe; //To check
  }

  setBodyType(bodyType: BodyType): void {
    Object.values(this.items).forEach(item => {
        if (item) item.setBodyType(bodyType);
    });
  }
}