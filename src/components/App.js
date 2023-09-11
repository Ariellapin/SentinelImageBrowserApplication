import React from "react";
import './App.css';
import SatiliteImagesComponent from './SatelliteImagesComponent';

function App() {

  return (
    <div className="ui main">
      <header className="App-header">
        <h1 className="red">Copernicus images</h1>
      </header>
        <SatiliteImagesComponent />
    </div>
  );
}

export default App;
