import React, { useEffect, useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';

function App() {

  //TODO : 
  //DONE  --- Place ships when shipcount > 0, move on to Fire phase 
  //Use of current player instead of individual players?
  //Re-render one battlemap rather than different ones
  //Reduce health of player when ship gets hit, visual input
  //End game when one player reaches 0 health
  //Statistics
  //Reset Game
  //Styling

  
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
  
  if(playerOne.shipsLeftToPlace === 1 && playerOne.isPlaying) {
    changePlayer()
  }
  else if (playerTwo.shipsLeftToPlace === 1  && playerTwo.isPlaying){
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

const handlePlayerFire = (id: number) => {
  setZoneList(
    zoneList.map((zone) => {
      if (zone.id == id && playerOne.isPlaying == true && zone.shipPlacedByPlayerTwo) {
        //alert("Hit!")
        removeHealthFromPlayer()
        changePlayer()
        return  {...zone, successfullHitFromPlayerOne: zone.successfullHitFromPlayerOne = true}
      }

      else if (zone.id == id && playerOne.isPlaying == true && !zone.shipPlacedByPlayerTwo) {
        //alert("Miss!")
        changePlayer()
        return  {...zone, failedHitFromPlayerOne: zone.failedHitFromPlayerOne = true}
      }

      else if (zone.id == id && playerTwo.isPlaying == true && zone.shipPlacedByPlayerOne) {
        //alert("Hit!")
        removeHealthFromPlayer()
        changePlayer()
        return  {...zone, successfullHitFromPlayerTwo: zone.successfullHitFromPlayerTwo = true}
      }

      else if (zone.id == id && playerTwo.isPlaying == true && !zone.shipPlacedByPlayerOne) {
        //alert("Miss!")
        changePlayer()
        return  {...zone, failedHitFromPlayerTwo: zone.failedHitFromPlayerTwo = true}
      }
      
      return zone;

    }))
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

  const removeHealthFromPlayer = () => {
    
    
    if (playerOne.isPlaying == true) {
      setPlayerTwo(prevPlayerTwo => ({
        ...prevPlayerTwo,
        health: prevPlayerTwo.health - 1
      }));
    }

    else if (playerTwo.isPlaying == true) {
      setPlayerOne(prevPlayerOne => ({
        ...prevPlayerOne,
        health: prevPlayerOne.health - 1
      }));
    }

    if (playerOne.health <= 1 || playerTwo.health <= 1){
      alert("Game should end.")
    }

  };
  
  const generateZoneList = Array.from({length: numberOfZones}, (_, index) => ({
    id: index + 1,
    shipPlacedByPlayerOne: false,
    shipPlacedByPlayerTwo: false,
    successfullHitFromPlayerOne: false,
    successfullHitFromPlayerTwo: false,
    failedHitFromPlayerOne: false,
    failedHitFromPlayerTwo: false
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
      list={zoneList} />
    </div>
  );
}

export default App;
