import React, { useEffect, useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';

function App() {

  
  
  const [playerOne, setPlayerOne] = useState<IPlayer>({
    id: 1,
    playerName: "playerOne",
    shotsFired: 0,
    shipsLeftToPlace: 5,
    numberOfVictories: 0,
    health: 5,
    isPlaying: true
  });
  
  const [playerTwo, setPlayerTwo] = useState<IPlayer>({
    id: 2,
    playerName: "playerTwo",
    shotsFired: 0,
    shipsLeftToPlace: 5,
    numberOfVictories: 0,
    health: 5,
    isPlaying: false
  });

  const numberOfZones = 25;
  
  //needed?
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(playerOne);
  


  

//TODO: Is this function needed?    
const handleClick = (id: number) => {
  if (currentPlayer.shipsLeftToPlace > 0) {
    handleShipPlacement(id);
  }
  else if (currentPlayer.shipsLeftToPlace <= 0){
    handleShipPlacement(id);
  }
};

const changePlayer = () => {
  setPlayerOne(prevPlayerOne => ({
    ...prevPlayerOne,
    isPlaying: !prevPlayerOne.isPlaying,
  }));

  setPlayerTwo(prevPlayerTwo => ({
    ...prevPlayerTwo,
    isPlaying: !prevPlayerTwo.isPlaying,
  }));
};

const handleShipPlacement = (id: number) => {
  setZoneList(
    zoneList.map((zone) => {
      if (zone.id == id && playerOne.isPlaying == true && playerOne.shipsLeftToPlace > 0) {
        return  {...zone, shipPlacedByPlayerOne: !zone.shipPlacedByPlayerOne}
      }
      else if (zone.id == id && playerTwo.isPlaying == true  && playerTwo.shipsLeftToPlace > 0){
        return {...zone, shipPlacedByPlayerTwo: !zone.shipPlacedByPlayerTwo}
      }
      return zone;
    }))
}

  const decreaseCurrentPlayerShipCount = () => {
    if (currentPlayer == playerOne) {
      setPlayerOne({...playerOne, shipsLeftToPlace: playerOne.shipsLeftToPlace - 1})
    }
    else if (currentPlayer == playerTwo){
      setPlayerTwo({...playerTwo, shipsLeftToPlace: playerTwo.shipsLeftToPlace - 1})
    }
    console.log(playerOne)
    console.log(playerTwo)
  };


  const generateZoneList = Array.from({length: numberOfZones}, (_, index) => ({
    id: index + 1,
    shipPlacedByPlayerOne: false,
    shipPlacedByPlayerTwo: false
    })    
  )

  const [zoneList, setZoneList] = useState<IBattleZone[]>(generateZoneList)

  
  

  return (
   
    <div className="App">
      <h1>BattleShips</h1>
      <BattleMap 
      playerOne={playerOne}
      playerTwo={playerTwo}
      changePlayer={changePlayer}
      handleShipPlacement={handleShipPlacement}
      list={zoneList}
      handleClick={handleClick} />
    </div>
  );
}

export default App;
