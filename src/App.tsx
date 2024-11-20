import React, { useState, useRef } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import { ModelName, BodyType, ModelSubtype } from './ModelEnums';
import DropdownSelector from './DropdownSelector';
import ItemManager from './ItemManager';

const App: React.FC = () => {
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType>(BodyType.Male);
  const [selectedAccessory, setSelectedAccessory] = useState<ModelName>(ModelName.EmptyAccessory);
  const [selectedBottom, setSelectedBottom] = useState<ModelName>(ModelName.EmptyBottom);
  const [selectedHairstly, setSelectedHairstly] = useState<ModelName>(ModelName.EmptyHairstly);
  const [selectedShoe, setSelectedShoe] = useState<ModelName>(ModelName.EmptyShoe);
  const [selectedTop, setSelectedTop] = useState<ModelName>(ModelName.EmptyTop);
  const itemManagerRef = useRef<ItemManager | null>(new ItemManager());

  const threeSceneRef = useRef<{ downloadGLB: () => void }>(null);

  const handleDownload = () => {
    if (threeSceneRef.current) {
      threeSceneRef.current.downloadGLB();
    }
  };

  const handleBodyChange = (value: string) => {
    setSelectedBodyType(value === BodyType.Male ? BodyType.Male : BodyType.Female);
  };

  const handleAccessoryChange = (value: string) => {
    if (itemManagerRef.current) setSelectedAccessory(itemManagerRef.current.getModelNameFromString(value));
  };

  const handleBottomChange = (value: string) => {
    if (itemManagerRef.current) setSelectedBottom(itemManagerRef.current.getModelNameFromString(value));
  };

  const handleHairstlyChange = (value: string) => {
    if (itemManagerRef.current) setSelectedHairstly(itemManagerRef.current.getModelNameFromString(value));
  };

  const handleShoeChange = (value: string) => {
    if (itemManagerRef.current) setSelectedShoe(itemManagerRef.current.getModelNameFromString(value));
  };

  const handleTopChange = (value: string) => {
    if (itemManagerRef.current) setSelectedTop(itemManagerRef.current.getModelNameFromString(value));
  };

  return (
    <div className="App">
      <div className="side-menu">
        <DropdownSelector
          label="Body Type"
          options={[BodyType.Male, BodyType.Female]}
          selectedValue={selectedBodyType}
          onChange={handleBodyChange}
        />

        <DropdownSelector
          label="Hairstyle"
          options={
            itemManagerRef.current? 
            itemManagerRef.current.getNamesBySubtype(ModelSubtype.Hairstly)
            : []
          }
          selectedValue={selectedHairstly}
          onChange={handleHairstlyChange}
        />

        <DropdownSelector
          label="Tops"
          options={
            itemManagerRef.current? 
            itemManagerRef.current.getNamesBySubtype(ModelSubtype.Top)
            : []
          }
          selectedValue={selectedTop}
          onChange={handleTopChange}
        />

        <DropdownSelector
          label="Bottoms"
          options={
            itemManagerRef.current? 
            itemManagerRef.current.getNamesBySubtype(ModelSubtype.Bottom)
            : []
          }
          selectedValue={selectedBottom}
          onChange={handleBottomChange}
        />

        <DropdownSelector
          label="Shoes"
          options={
            itemManagerRef.current? 
            itemManagerRef.current.getNamesBySubtype(ModelSubtype.Shoe)
            : []
          }
          selectedValue={selectedShoe}
          onChange={handleShoeChange}
        />

        <DropdownSelector
          label="Accessories"
          options={
            itemManagerRef.current? 
            itemManagerRef.current.getNamesBySubtype(ModelSubtype.Accessory)
            : []
          }
          selectedValue={selectedAccessory}
          onChange={handleAccessoryChange}
        />

        <button onClick={handleDownload}>Download Model</button>
      </div>

      <div className="scene-container">
        <ThreeScene
          ref={threeSceneRef}
          selectedBodyType={selectedBodyType}
          selectedAccessory={selectedAccessory}
          selectedBottom={selectedBottom}
          selectedHairstly={selectedHairstly}
          selectedShoe={selectedShoe}
          selectedTop={selectedTop}
          itemManager = {itemManagerRef.current}
        />
      </div>
    </div>
  );
};

export default App;
