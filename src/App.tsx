import React, { useEffect, useState } from 'react';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';
import Scoreboard from './Components/Scoreboard/Scoreboard';
import './App.css'

function App() {


  //TODO : 
  //DONE  --- Place ships when shipcount > 0, move on to Fire phase 
  //??? Re-render one battlemap rather than different ones
  //DONE ---Reduce health of player when ship gets hit, visual input
  //DONE ---End game when one player reaches 0 health
  //DONE --- Add victory to winning player
  //DONE Reset Game
  
  
  //Better way to handle duplicate clicks on zone rather than alert
  //Name of classes (IBattleZone, IPlayer) ??? 
  
  
  //DONE ??? More stats, health styling - Statistics && SCOREBOARD!! (Ship Counter, Green for alive Red for hit? on Top?)
  //DONE Use BattleZone to render?
  
  
  //TODO: Shorten if-statements?
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

  //Variabel för att bestämma hur många BattleZones som genereras
  const numberOfZones = 25;
  //State-Variabel för att kontrollera vilken content som visas i BattleMap
  const [gameIsPlaying, setGameIsPlaying] = useState<boolean>(true)
  //State-Variabel för att generera en lista med antal BattleZones som beror på variabeln numberOfZOnes
  const [zoneList, setZoneList] = useState<IBattleZone[]>(() => {
    return Array.from({ length: numberOfZones }, (_, index) => ({
      id: index + 1,
      shipPlacedByPlayerOne: false,
      shipPlacedByPlayerTwo: false,
      successfullHitFromPlayerOne: false,
      successfullHitFromPlayerTwo: false,
      failedHitFromPlayerOne: false,
      failedHitFromPlayerTwo: false
    }));
  });

  const [showShips, setShowShips] = useState<boolean>(true)
  
  const handleShips = () => {
    setShowShips(!showShips)
  }

  //När spelares hälsa når 0 körs kod för att hantera detta direkt när en spelare förlorar en hälsa och hamnar på 0.
  useEffect(() => {
    if (playerOne.health == 0 || playerTwo.health == 0) {
      increasePlayerVictories()
    }
  }, [playerOne.health, playerTwo.health])

  
//Funktion för att ändra variabeln isPlaying på varje spelare.
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

//Funktion för att ändra variabeln gameIsPlaying som används för att bestämma vad som ska visas i BattleMap.
const changeGameState = () => {
  setGameIsPlaying(prevGameIsPlaying => !prevGameIsPlaying);
};


//Funktion för att hantera spelares placering av skepp.
const handleShipPlacement = (id: number) => {
  
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

    if(playerOne.shipsLeftToPlace === 1 && playerOne.isPlaying) {
      changePlayer()
    }
    else if (playerTwo.shipsLeftToPlace === 1  && playerTwo.isPlaying){
      setShowShips(false);
      changePlayer()
    }
}

const handlePlayerFire = (id: number) => {
  //Variabel för enskild zone som används för att kolla om nuvarande spelare har tryckt på zonen innan
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
          setTimeout(() => {
            changePlayer();
          }, 1000);
        }
        return  {...zone, successfullHitFromPlayerOne: zone.successfullHitFromPlayerOne = true}
      }

      else if (zone.id == id && playerOne.isPlaying == true && !zone.shipPlacedByPlayerTwo) {
        if (targetedZone?.successfullHitFromPlayerOne || targetedZone?.failedHitFromPlayerOne){
          alert("Already clicked! Try another zone.")
        }
        else {
          increaseShotsFired()
          setTimeout(() => {
            changePlayer();
          }, 1000);
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
          setTimeout(() => {
            changePlayer();
          }, 1000);
        }
        return  {...zone, successfullHitFromPlayerTwo: zone.successfullHitFromPlayerTwo = true}
      }

      else if (zone.id == id && playerTwo.isPlaying == true && !zone.shipPlacedByPlayerOne) {
        if (targetedZone?.successfullHitFromPlayerTwo || targetedZone?.failedHitFromPlayerTwo){
          alert("Already clicked! Try another zone.") 
        }
        else {
          increaseShotsFired()
          setTimeout(() => {
            changePlayer();
          }, 2000);
        }
        return  {...zone, failedHitFromPlayerTwo: zone.failedHitFromPlayerTwo = true}
      }

      return zone;

    }))
}

//Funktion som tar bort ett skepp från spelare. Används när spelare kallar på handlePlayerFire() på en zon där motståndaren har skepp.
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
//Funktion som tar bort en "hälsopoäng" från spelare. Används när spelare kallar på handlePlayerFire() på en zon där motståndaren har skepp.

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
    //Används för att kontrollera om en av de två spelarna har förlorat.
    increasePlayerVictories()
  };

//Funktion för att öka property shotsFired som sedan används för att räkna ut spelares träffsäkerhet.
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
    setShowShips(true)
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
      list={zoneList}
      showShips={showShips}
      handleShips={handleShips} />
      
    </div>
  );
}

export default App;
