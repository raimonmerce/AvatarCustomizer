import { ModelName, ModelSubtype, ModelType, BodyType } from '../ItemManager';

export default class Item {
    private type: ModelType;
    private subType?: ModelSubtype;
    private name: ModelName;
    private urlM: string;
    private urlF?: string;
    private bodyType: BodyType;
  
    constructor(
      type: ModelType,
      name: ModelName,
      urlM: string,
      bodyType: BodyType,
      subType?: ModelSubtype,
      urlF?: string,
    ) {
      this.type = type;
      this.name = name;
      this.urlM = urlM;
      this.bodyType = bodyType;
      this.subType = subType;
      this.urlF = urlF;
    }

    public getName() : ModelName{
        return this.name;
    }

    public getType() : ModelType{
        return this.type;
    }

    public getSubtype() : ModelSubtype | null{
        return this.subType? this.subType : null;
    }

    public getBodyType() : BodyType{
        return this.bodyType;
    }

    public setBodyType(bodyType : BodyType){
        this.bodyType = bodyType;
    }

    public getUrlGLB() : string {
        return (this.bodyType === BodyType.Female && this.urlF)? this.urlF : this.urlM;
    }
  }
  