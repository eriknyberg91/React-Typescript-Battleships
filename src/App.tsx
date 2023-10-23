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
  
  if(playerOne.shipsLeftToPlace == 0 && playerOne.isPlaying) {
    changePlayer()
  }
  //TODO: Shorten if-statements?
  setZoneList(
    zoneList.map((zone) => {
      if (zone.id == id && playerOne.isPlaying == true && playerOne.shipsLeftToPlace > 0 && zone.shipPlacedByPlayerOne == false) {
        removeOneShipFromPlayer()
        return  {...zone, shipPlacedByPlayerOne: !zone.shipPlacedByPlayerOne}
      }
      else if (zone.id == id && playerTwo.isPlaying == true  && playerTwo.shipsLeftToPlace > 0 && zone.shipPlacedByPlayerTwo == false){
        removeOneShipFromPlayer()
        return {...zone, shipPlacedByPlayerTwo: !zone.shipPlacedByPlayerTwo}
      }
      return zone;

    }))
}

const handlePlayerFire = () => {
  alert("Fire phase");
}

const removeOneShipFromPlayer = () => {
  
  if (playerOne.isPlaying == true) {
    setPlayerOne(prevPlayerOne => ({
      ...prevPlayerOne,
      shipsLeftToPlace: prevPlayerOne.shipsLeftToPlace - 1
    }));
    console.log(playerOne.shipsLeftToPlace)
  }

  else if (playerTwo.isPlaying == true) {
    setPlayerTwo(prevPlayerTwo => ({
      ...prevPlayerTwo,
      shipsLeftToPlace: prevPlayerTwo.shipsLeftToPlace - 1
    }));
  };
    console.log(playerTwo.shipsLeftToPlace)
  }
  
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
      handlePlayerFire={handlePlayerFire}
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
