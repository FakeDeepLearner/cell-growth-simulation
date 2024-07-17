import React from 'react';
import './App.css';
import Simulation from "./simulation-components/simulation";

function App() {
  return (
    <div className="App">
     <Simulation tickInterval={1} isRunning={false} boardProperties={{width: 20, height:20}}></Simulation>
    </div>
  );
}

export default App;
