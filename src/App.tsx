import React, { useState, useRef } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import { ModelName, BodyType, ItemManager, ModelSubtype } from './ItemManager';
import DropdownSelector from './DropdownSelector';

const App: React.FC = () => {
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType>(BodyType.Male);
  const [selectedAccessory, setSelectedAccessory] = useState<ModelName>(ModelName.EmptyAccessory);
  const [selectedBottom, setSelectedBottom] = useState<ModelName>(ModelName.EmptyBottom);
  const [selectedHairstly, setSelectedHairstly] = useState<ModelName>(ModelName.EmptyHairstly);
  const [selectedShoe, setSelectedShoe] = useState<ModelName>(ModelName.EmptyShoe);
  const [selectedTop, setSelectedTop] = useState<ModelName>(ModelName.EmptyTop);
  const itemManager = new ItemManager();

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
    setSelectedAccessory(itemManager.getModelNameFromString(value));
  };

  const handleBottomChange = (value: string) => {
    setSelectedBottom(itemManager.getModelNameFromString(value));
  };

  const handleHairstlyChange = (value: string) => {
    setSelectedHairstly(itemManager.getModelNameFromString(value));
  };

  const handleShoeChange = (value: string) => {
    setSelectedShoe(itemManager.getModelNameFromString(value));
  };

  const handleTopChange = (value: string) => {
    setSelectedTop(itemManager.getModelNameFromString(value));
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
          options={itemManager.getNamesBySubtype(ModelSubtype.Hairstly)}
          selectedValue={selectedHairstly}
          onChange={handleHairstlyChange}
        />

        <DropdownSelector
          label="Tops"
          options={itemManager.getNamesBySubtype(ModelSubtype.Top)}
          selectedValue={selectedTop}
          onChange={handleTopChange}
        />

        <DropdownSelector
          label="Bottoms"
          options={itemManager.getNamesBySubtype(ModelSubtype.Bottom)}
          selectedValue={selectedBottom}
          onChange={handleBottomChange}
        />

        <DropdownSelector
          label="Shoes"
          options={itemManager.getNamesBySubtype(ModelSubtype.Shoe)}
          selectedValue={selectedShoe}
          onChange={handleShoeChange}
        />

        <DropdownSelector
          label="Accessories"
          options={itemManager.getNamesBySubtype(ModelSubtype.Accessory)}
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
        />
      </div>
    </div>
  );
};

export default App;
