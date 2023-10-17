import React, { useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';

function App() {

  const numberOfZones = 25;

  const generateZoneList = Array.from({length: numberOfZones}, (_, index) => ({
    id: index + 1,
    isClicked: false,
    clickedByPlayerOne: false,
    clickedByPlayerTwo: false
    })    
  )

  const [zoneList, setZoneList] = useState<IBattleZone[]>(generateZoneList)

  const handleClick = (id: number) => {
    console.log(id);
    setZoneList(
      zoneList.map((zone) => {
        if (zone.id == id) {
          return {...zone, isClicked: !zone.isClicked}
        }
        return zone;
      })
    )
  }
  

  return (
    <div className="App">
      <h1>BattleShips</h1>
      <BattleMap list={zoneList} handleClick={handleClick} />
    </div>
  );
}

export default App;
