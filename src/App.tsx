import React, { useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';

function App() {
  //TODO : Bort med testplayer (används för currentPlayer state)
  const testPlayer : IPlayer =
  {id: 3,
    playerName: "test Player",
    shotsFired: 0,
    shipsLeftToPlace: 5,
    numberOfVictories: 0,
    health: 5,
    isPlaying: false
  }
  const numberOfZones = 25;
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(testPlayer);
  


//Maps over array of players to swap player turn and set current player.
  const changeActivePlayer = () => {
    players.map((player) => {
      if (player.isPlaying == false || player.isPlaying == true) {
            player.isPlaying= !player.isPlaying;
      }
      if (player.isPlaying == true) {
            setCurrentPlayer(player)
      }})
  }

  


//TODO: Is this function needed?    
  const handleClick = (id: number) => {
    console.log(id);
    setZoneList(
      zoneList.map((zone) => {
        if (zone.id == id) {
          return zone;
        }
        return zone;
        
      }))
  }
//TODO: Testing if it works as planned, implement style for each scenario
//TODO: Move on to Fire Phase, stop ShipCount going down?
  const handleShipPlacement = (id: number, currentPlayer: IPlayer) => {
    
    setZoneList(
      zoneList.map((zone) => {
        if (zone.id == id && currentPlayer.id == 1 && currentPlayer.shipsLeftToPlace > 0) {
          return  {...zone, shipPlacedByPlayerOne: !zone.shipPlacedByPlayerOne}
        }
        else if (zone.id == id && currentPlayer.id == 2  && currentPlayer.shipsLeftToPlace > 0){
          return {...zone, shipPlacedByPlayerTwo: !zone.shipPlacedByPlayerTwo}
        }
        
        return zone;
      }))
      decreaseCurrentPlayerShipCount();
      changeActivePlayer();     
  }
//TODO: Move on to Fire Phase, stop ShipCount going down?
  const decreaseCurrentPlayerShipCount = () => {
    if (currentPlayer.shipsLeftToPlace != 0){
      setPlayers(players => {
        return players.map(player => {
          if (player.id === currentPlayer.id) {
            return {
              ...player,
              shipsLeftToPlace: player.shipsLeftToPlace - 1
            };
          }
          return player;
        });
      });
    }
  };

  

  
  
  const [players, setPlayers] = useState <IPlayer[]>(
    [
      {
        id: 1,
        playerName: "playerOne",
        shotsFired: 0,
        shipsLeftToPlace: 5,
        numberOfVictories: 0,
        health: 5,
        isPlaying: false},
      {
        id: 2,
        playerName: "playerTwo",
        shotsFired: 0,
        shipsLeftToPlace: 5,
        numberOfVictories: 0,
        health: 5,
        isPlaying: true
      }
  ])



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
      handleShipPlacement={handleShipPlacement}
      list={zoneList}
      currentPlayer={currentPlayer} 
      handleClick={handleClick}
      changeActivePlayer={changeActivePlayer} />
    </div>
  );
}

export default App;
