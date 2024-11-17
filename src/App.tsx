import React, { useState } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import { ModelName, BodyType, ItemManager, ModelSubtype} from './ItemManager';
import DropdownSelector from './DropdownSelector';

const App: React.FC = () => {
  const [bodyType, setBodyType] = useState<BodyType>(BodyType.Male);
  const [selectedAccessory, setSelectedAccessory] = useState<ModelName>(ModelName.EmptyAccessory);
  const [selectedBottom, setSelectedBottom] = useState<ModelName>(ModelName.EmptyBottom);
  const [selectedHairstly, setSelectedHairstly] = useState<ModelName>(ModelName.EmptyHairstly);
  const [selectedShoe, setSelectedShoe] = useState<ModelName>(ModelName.EmptyShoe);
  const [selectedTop, setSelectedTop] = useState<ModelName>(ModelName.EmptyTop);
  const itemManager = new ItemManager();
  const loadBodyType = (bodyType: BodyType) => {
    setBodyType(bodyType);
  };

  const handleAccessoryChange = (value: string) => {
    setSelectedAccessory(itemManager.getModelNameFromString(value));
  };

  const handleBottomChange = (value: string) => {
    console.log("handleBottomChange");
    setSelectedBottom(itemManager.getModelNameFromString(value));
  };

  const handleHairstlyChange = (value: string) => {
    
    setSelectedHairstly(itemManager.getModelNameFromString(value));
  };

  const handleShoeChange = (value: string) => {
    console.log("handleShoeChange");
    setSelectedShoe(itemManager.getModelNameFromString(value));
  };

  const handleTopChange = (value: string) => {
    setSelectedTop(itemManager.getModelNameFromString(value));
  };

  return (
    <div className="App">
      <div className="button-container">
        <button onClick={() => loadBodyType(BodyType.Male)}>Load Male</button>
        <button onClick={() => loadBodyType(BodyType.Female)}>Load Female</button>
      </div>

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

      <ThreeScene 
        bodyType={bodyType} 
        selectedAccessory={selectedAccessory}
        selectedBottom={selectedBottom}
        selectedHairstly={selectedHairstly}
        selectedShoe={selectedShoe}
        selectedTop={selectedTop}
      />
    </div>
  );
};

export default App;
