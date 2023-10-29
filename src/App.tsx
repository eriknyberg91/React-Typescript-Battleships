import React, { ReactNode, useEffect, useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';
import Scoreboard from './Components/Scoreboard/Scoreboard';

function App() {


  //TODO : 
  //DONE  --- Place ships when shipcount > 0, move on to Fire phase 
  //??? Use of current player instead of individual players?
  //??? Re-render one battlemap rather than different ones
  //DONE ---Reduce health of player when ship gets hit, visual input
  //DONE ---End game when one player reaches 0 health
  //DONE --- Add victory to winning player
  //DONE Reset Game
  
  
  //Better way to handle duplicate clicks on zone rather than alert
  //DONE ??? More stats, health styling - Statistics && SCOREBOARD!! (Ship Counter, Green for alive Red for hit? on Top?)
  //Use BattleZone to render?
  
  
  
  //Styling
  //Formating and readability

  
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
  const [gameIsPlaying, setGameIsPlaying] = useState<boolean>(true)
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

  

  //Updates game state based on changes in health of players.
  useEffect(() => {
    if (playerOne.health == 0 || playerTwo.health == 0) {
      increasePlayerVictories()
    }
  }, [playerOne.health, playerTwo.health, playerOne.numberOfVictories, playerTwo.numberOfVictories])

  

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


const changeGameState = () => {
  setGameIsPlaying(prevGameIsPlaying => !prevGameIsPlaying);
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

  const targetedZone = zoneList.find(zone => zone.id == id)


  setZoneList(
    zoneList.map((zone) => {
      if (zone.id == id && playerOne.isPlaying == true && zone.shipPlacedByPlayerTwo) {
        if (targetedZone?.successfullHitFromPlayerOne || targetedZone?.failedHitFromPlayerOne){
          alert("Already clicked! Try another zone.")
        }
        else {
          increaseShotsFired()
          removeHealthFromPlayer()
          changePlayer()
        }
        return  {...zone, successfullHitFromPlayerOne: zone.successfullHitFromPlayerOne = true}
      }

      else if (zone.id == id && playerOne.isPlaying == true && !zone.shipPlacedByPlayerTwo) {
        if (targetedZone?.successfullHitFromPlayerOne || targetedZone?.failedHitFromPlayerOne){
          alert("Already clicked! Try another zone.")
        }
        else {
          increaseShotsFired()
          changePlayer()
        }
        return  {...zone, failedHitFromPlayerOne: zone.failedHitFromPlayerOne = true}
      }

      else if (zone.id == id && playerTwo.isPlaying == true && zone.shipPlacedByPlayerOne) {
        if (targetedZone?.successfullHitFromPlayerTwo || targetedZone?.failedHitFromPlayerTwo){
          alert("Already clicked! Try another zone.")
        }
        else {
          increaseShotsFired()
          removeHealthFromPlayer()
          changePlayer()
        }
        return  {...zone, successfullHitFromPlayerTwo: zone.successfullHitFromPlayerTwo = true}
      }

      else if (zone.id == id && playerTwo.isPlaying == true && !zone.shipPlacedByPlayerOne) {
        if (targetedZone?.successfullHitFromPlayerTwo || targetedZone?.failedHitFromPlayerTwo){
          alert("Already clicked! Try another zone.") 
        }
        else {
          increaseShotsFired()
          changePlayer()
        }
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
  }

  else if (playerTwo.isPlaying == true) {
    setPlayerTwo(prevPlayerTwo => ({
      ...prevPlayerTwo,
      shipsLeftToPlace: prevPlayerTwo.shipsLeftToPlace - 1
    }));
  };
  
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
    increasePlayerVictories()
  };

  const increaseShotsFired = () => {
    if (playerOne.isPlaying == true) {

      setPlayerOne(prevPlayerOne => ({
        ...prevPlayerOne,
        shotsFired: prevPlayerOne.shotsFired + 1
      }));

    }

    else if (playerTwo.isPlaying == true) {

      setPlayerTwo(prevPlayerTwo => ({
        ...prevPlayerTwo,
        shotsFired: prevPlayerTwo.shotsFired + 1
      }));

    } 
  }

  const increasePlayerVictories = () => {
    if (playerOne.health == 0 && gameIsPlaying) {
      setPlayerTwo(prevPlayerTwo => ({
        ...prevPlayerTwo,
        numberOfVictories: prevPlayerTwo.numberOfVictories + 1
      }));
      changeGameState()
    }

    else if (playerTwo.health == 0 && gameIsPlaying) {
      setPlayerOne(prevPlayerOne => ({
        ...prevPlayerOne,
        numberOfVictories: prevPlayerOne.numberOfVictories + 1
      }));
      changeGameState()
    }
  }
  
  const calculateAccuracy = (player: IPlayer) => {
    const succesfulHitsOnZone = zoneList.filter((zone) => {
      if (player.id == 1) {
        return zone.successfullHitFromPlayerOne
      }
      else if (player.id == 2) {
        return zone.successfullHitFromPlayerTwo
      }
    }).length

    const accuracy = (succesfulHitsOnZone / player.shotsFired) * 100;

    return accuracy.toFixed(2);
  }

  const resetGame = () => {
    const resetPlayerOne = {
      ...playerOne,
      id: playerOne.id,
      playerName: playerOne.playerName,
      shotsFired: 0,
      shipsLeftToPlace: 5,
      numberOfVictories: playerOne.numberOfVictories,
      health: 5,
      isPlaying: true
    }
    const resetPlayerTwo = {
      ...playerTwo,
      id: playerTwo.id,
      playerName: playerTwo.playerName,
      shotsFired: 0,
      shipsLeftToPlace: 5,
      numberOfVictories: playerTwo.numberOfVictories,
      health: 5,
      isPlaying: false
    }
    const resetZoneList = zoneList.map((zone) => {
      return {
        ...zone,
        shipPlacedByPlayerOne: false,
        shipPlacedByPlayerTwo: false,
        successfullHitFromPlayerOne: false,
        successfullHitFromPlayerTwo: false,
        failedHitFromPlayerOne: false,
        failedHitFromPlayerTwo: false
      }
    })
    setPlayerOne(resetPlayerOne)
    setPlayerTwo(resetPlayerTwo)
    setZoneList(resetZoneList)
    changeGameState()
    
  }

  
  
  

  return (
   
    <div className="App">
      <Scoreboard firstPlayer={playerOne} secondPlayer={playerTwo}/>
      <BattleMap 
      calculateAccuracy={calculateAccuracy}
      resetGame={resetGame}
      changeGameState={changeGameState}
      gameIsPlaying={gameIsPlaying}
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
