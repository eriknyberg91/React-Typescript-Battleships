import React, { useEffect, useState } from 'react';
import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css';
import IPlayer from '../../Classes/IPlayer';

interface Props {
  list: IBattleZone[];
  handleShipPlacement(id: number): void;
  changePlayer(): void;
  handlePlayerFire(id: number): void;
  changeGameState(): void;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  gameIsPlaying: boolean;
  currentPlayer: IPlayer;
  changeCurrentPlayer(): void;
}

const BattleMap = ({list,playerOne, playerTwo, gameIsPlaying, currentPlayer,  handleShipPlacement, changePlayer, handlePlayerFire, changeGameState, changeCurrentPlayer}: Props) => {
  
  return (
    <div className="battle-map-container" >
          <div className="battle-maps-container"style={{display: gameIsPlaying ? 'block' : 'none'}}>
          <div className="intro-container">
            <h2>Current Player: {playerOne.isPlaying ? playerOne.playerName : playerTwo.playerName}</h2>
            <h2>Current Player Variable: {currentPlayer.playerName}</h2>
            <button onClick={() => changePlayer()}>Change Player</button>
            <button onClick={() => changeGameState()}>Change game state</button>
          </div>
          <div className="battlemap" style={{display: playerOne.isPlaying ? 'grid' : 'none' }}>
        {list.map((zone) => (
          <div className="battle-zone" onClick={() => {playerOne.shipsLeftToPlace > 0 || playerTwo.shipsLeftToPlace > 0 ? handleShipPlacement(zone.id) : handlePlayerFire(zone.id)}} >
            <h6>{zone.id}</h6>
            <p>Battle Zone</p>
            <p style={{color: zone.successfullHitFromPlayerOne ? 'green' : 'white'}}>Hit</p>
            <p style={{color: zone.failedHitFromPlayerOne ? 'red' : 'white'}}>Miss</p>
            <button onClick={() => handlePlayerFire(zone.id)}>Fire</button>
          </div>
        ))}
      </div>
      <div className="battlemap" style={{display: playerTwo.isPlaying ? 'grid' : 'none' }}>
        {list.map((zone) => (
          <div className="battle-zone" onClick={() => {playerOne.shipsLeftToPlace > 0 || playerTwo.shipsLeftToPlace > 0 ? handleShipPlacement(zone.id) : handlePlayerFire(zone.id)}} >
            <h6>{zone.id}</h6>
            <p>Battle Zone</p>
            <p style={{color: zone.successfullHitFromPlayerTwo ? 'green' : 'white'}}>Hit</p>
            <p style={{color: zone.failedHitFromPlayerTwo ? 'red' : 'white'}}>Miss</p>
            <button onClick={() => handlePlayerFire(zone.id)}>Fire</button>
          </div>
        ))}
      </div>

      <h1>Shipboard of {currentPlayer.playerName}</h1>
      <div className="battlemap" style={{display: playerOne.isPlaying ? 'grid' : 'none' }}>
        {list.map((zone) => (
          <div className="battle-zone">
            <h6>{zone.id}</h6>
            <p>Battle Zone</p>
            <p style={{color: zone.shipPlacedByPlayerOne ? 'green' : 'white'}}>Ship Placed</p>

          </div>
        ))}
      </div>
      <div className="battlemap" style={{display: playerTwo.isPlaying ? 'grid' : 'none' }}>
        {list.map((zone) => (
          <div className="battle-zone" >
            <h6>{zone.id}</h6>
            <p>Battle Zone</p>
            <p style={{color: zone.shipPlacedByPlayerTwo ? 'green' : 'white'}}>Ship Placed</p>

          </div>
        ))}
      </div>
          </div>
      

      <div className="end-game-container" style={{display: gameIsPlaying ? 'none' : 'block' }}>
        <h1>Game has ended.</h1>
      </div>  
    </div>
    
    
  );
};

export default BattleMap;