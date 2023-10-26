import React, { ReactNode, useEffect, useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';

function App() {

  

  //TODO : 
  //DONE  --- Place ships when shipcount > 0, move on to Fire phase 
  //??? Use of current player instead of individual players?
  //??? Re-render one battlemap rather than different ones
  //DONE ---Reduce health of player when ship gets hit, visual input
  //DONE ---End game when one player reaches 0 health
  //Better way to handle duplicate clicks on zone rather than alert
  //Statistics
  //Reset Game
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

  //Updates game state based on changes in health of players.
  useEffect(() => {
    if (playerOne.health <= 0 || playerTwo.health <= 0) {
      changeGameState();
    }

  }, [playerOne.health, playerTwo.health])

  const numberOfZones = 25;

  const [gameIsPlaying, setGameIsPlaying] = useState<boolean>(true)
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(playerOne)

const changePlayer = () => {
  changeCurrentPlayer()
  setPlayerOne(prevPlayerOne => ({
    ...prevPlayerOne,
    isPlaying: !prevPlayerOne.isPlaying,
  }));

  setPlayerTwo(prevPlayerTwo => ({
    ...prevPlayerTwo,
    isPlaying: !prevPlayerTwo.isPlaying,
  }));
};

const changeCurrentPlayer = () => {
  if (playerOne.isPlaying == true) {
    setCurrentPlayer(playerTwo)
  }

  else if (playerTwo) {
    setCurrentPlayer(playerOne)
  }

  if (playerOne.health == 0 || playerTwo.health == 0){
    changeGameState()
  }
}

const changeGameState = () => {
  setGameIsPlaying(!gameIsPlaying)
}

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
      currentPlayer={currentPlayer}
      changeCurrentPlayer={changeCurrentPlayer}
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
