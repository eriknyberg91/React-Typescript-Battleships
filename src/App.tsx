import React, { useEffect, useState } from 'react';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';
import Scoreboard from './Components/Scoreboard/Scoreboard';
import './App.css'

function App() {

  //Spelarvariabler
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

  //När spelares hälsa når 0 körs kod för att hantera detta direkt när en spelare förlorar en hälsa och hamnar på 0.
    useEffect(() => {
      if (playerOne.health == 0 || playerTwo.health == 0) {
        handlePlayerVictories()
      }
    }, [playerOne.health, playerTwo.health])

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

  //Variabel och funktion som används för att visa "ship placement phase" samt att växla mellan handleShipPlacement och handlePlayerFire
  const [showShips, setShowShips] = useState<boolean>(true)
  const handleShowShips = () => {
    setShowShips(false)
  }
  
  //Funktion som används för att hantera spelares placering av skepp, mer specifikt när användare trycker på en knapp för att man är klar med "ship-phase"
  const finishShipPlacements = () => {
    
    if (playerOne.isPlaying) {
      changePlayer()
    }
    else if (playerTwo.isPlaying) {
      handleShowShips()
      changePlayer()
    }
  }

  



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
      if (zone.id == id && playerOne.isPlaying == true && !zone.shipPlacedByPlayerOne && playerOne.shipsLeftToPlace > 0) {
        removeOneShipFromPlayer()
        return  {...zone, shipPlacedByPlayerOne: !zone.shipPlacedByPlayerOne}
      }
      else if (zone.id == id && playerOne.isPlaying && zone.shipPlacedByPlayerOne && playerOne.shipsLeftToPlace >= 0){
        addOneShipToPlayer()
        return {...zone, shipPlacedByPlayerOne: !zone.shipPlacedByPlayerOne}
      }
      else if (zone.id == id && playerTwo.isPlaying == true  && !zone.shipPlacedByPlayerTwo && playerTwo.shipsLeftToPlace > 0){
        removeOneShipFromPlayer()
        return {...zone, shipPlacedByPlayerTwo: !zone.shipPlacedByPlayerTwo}
      }
      else if (zone.id == id && playerTwo.isPlaying == true && zone.shipPlacedByPlayerTwo && playerTwo.shipsLeftToPlace >= 0) {
        addOneShipToPlayer()
        return {...zone, shipPlacedByPlayerTwo: !zone.shipPlacedByPlayerTwo}
      }
      return zone;

    }))
  
}

//Funktion för att hantera spelares attack mot motståndare.
const handlePlayerFire = (id: number) => {
  //Variabel för enskild zone som används för att kolla om nuvarande spelare har tryckt på zonen innan
  const targetedZone = zoneList.find(zone => zone.id == id)
  
  //Ändrar properties i enskild zone beroende på olika conditions samt properties i påverkad spelare.
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
          }, 1000);
        }
        return  {...zone, failedHitFromPlayerTwo: zone.failedHitFromPlayerTwo = true}
      }

      return zone;

    }))
}

//Funktion som tar bort ett skepp från spelare. Används när spelare placerar ett skepp.
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
//Funktion som lägger till ett skepp till spelare. Används när spelare ångrar placering av skepp.
const addOneShipToPlayer = () => {
  
  if (playerOne.isPlaying == true) {
    setPlayerOne(prevPlayerOne => ({
      ...prevPlayerOne,
      shipsLeftToPlace: prevPlayerOne.shipsLeftToPlace + 1
    }));
  }

  else if (playerTwo.isPlaying == true) {
    setPlayerTwo(prevPlayerTwo => ({
      ...prevPlayerTwo,
      shipsLeftToPlace: prevPlayerTwo.shipsLeftToPlace + 1
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
    handlePlayerVictories()
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
//Funktion för att kolla om en spelare har 0 hälsa och ökar spelares antal vinster
  const handlePlayerVictories = () => {
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
//Funktion för att ta in spelare och kalkylera träffsäkerheten på skott.
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
//Funktion för att återställa spel
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
      gameIsPlaying={gameIsPlaying}
      handlePlayerFire={handlePlayerFire}
      playerOne={playerOne}
      playerTwo={playerTwo}
      handleShipPlacement={handleShipPlacement}
      list={zoneList}
      showShips={showShips}
      finishShipPlacements={finishShipPlacements} />
      
    </div>
  );
}

export default App;
