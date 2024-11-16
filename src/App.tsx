import React, { useState } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import { ModelName, BodyType } from './ItemManager';

const App: React.FC = () => {
  const [bodyType, setBodyType] = useState<BodyType>(BodyType.Male);
  const loadBodyType = (bodyType: BodyType) => {
    setBodyType(bodyType);
  };

  return (
    <div className="App">
      <button
        onClick={() => loadBodyType(BodyType.Male)}
        style={{ position: 'absolute', zIndex: 1, margin: '10px' }}
      >
        Load Male
      </button>

      <button
        onClick={() => loadBodyType(BodyType.Female)}
        style={{ position: 'absolute', zIndex: 1, margin: '10px 10px 10px 100px' }}
      >
        Load Female
      </button>

      <ThreeScene bodyType={bodyType} />
    </div>
  );
};

export default App;
