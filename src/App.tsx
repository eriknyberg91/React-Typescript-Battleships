import React, { useState } from 'react';
import BattleZone from './Components/BattleZone/BattleZone';
import BattleMap from './Components/BattleMap/BattleMap';
import IBattleZone from './Classes/IBattleZone';
import IPlayer from './Classes/IPlayer';

function App() {

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
  

  const setActivePlayer = () =>{
    players.map((player) => {
      if (player.isPlaying == true) {
        setCurrentPlayer(player)
      }
      
    })
      console.log(currentPlayer);
      
      
  }
  
  const changeActivePlayer = (id: number) => {
    setActivePlayer();
    players.map((player) => {
      if (player.isPlaying == false || player.isPlaying == true) {
        player.isPlaying= !player.isPlaying;
      }
    })
    }
        
    
    
    
  const handleClick = (id: number) => {
    console.log(id);
    setZoneList(
      zoneList.map((zone) => {
        if (zone.id == id) {
          return {...zone, isClicked: !zone.isClicked}
        }
        return zone;
        
      }))}

  
  
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
    isClicked: false,
    clickedByPlayerOne: false,
    clickedByPlayerTwo: false
    })    
  )

  const [zoneList, setZoneList] = useState<IBattleZone[]>(generateZoneList)

  
  

  return (
    <div className="App">
      <h1>BattleShips</h1>
      <BattleMap 
      list={zoneList}
      currentPlayer={currentPlayer} 
      handleClick={handleClick}
      setActivePlayer={setActivePlayer}
      changeActivePlayer={changeActivePlayer} />
    </div>
  );
}

export default App;
