import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';

function App() {

  const [zoneList, setZoneList] = useState<IBattleZone[]>([
    {id: 1, isClicked: false},
    {id: 2, isClicked: false},
    {id: 3, isClicked: false},
    {id: 4, isClicked: false},
    {id: 5, isClicked: false}
  ])

  const handleClick = (id: number) => {
    console.log(id);
  }
  

  return (
    <div className="App">
      <h1>BattleShips</h1>
      <BattleMap list={zoneList} handleClick={handleClick} />
    </div>
  );
}

export default App;
