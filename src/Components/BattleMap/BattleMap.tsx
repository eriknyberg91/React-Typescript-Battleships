import React, { useEffect, useState } from 'react';
import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css';
import IPlayer from '../../Classes/IPlayer';
import BattleZone from '../BattleZone/BattleZone';

interface Props {
  list: IBattleZone[];
  handleShipPlacement(id: number): void;
  changePlayer(): void;
  handlePlayerFire(id: number): void;
  changeGameState(): void;
  resetGame(): void;
  calculateAccuracy(player: IPlayer): void;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  gameIsPlaying: boolean;
}

const BattleMap = ({list,playerOne, playerTwo, gameIsPlaying, handleShipPlacement, changePlayer, handlePlayerFire, changeGameState, resetGame, calculateAccuracy}: Props) => {
  
  return (
    <div className="battle-map-container" >
          <div className="battle-maps-container"style={{display: gameIsPlaying ? 'block' : 'none'}}>
          <div className="intro-container">
            <h2>Current Player: {playerOne.isPlaying ? playerOne.playerName : playerTwo.playerName}</h2>
            <button onClick={() => changePlayer()}>Change Player</button>
            <button onClick={() => changeGameState()}>Change game state</button>
          </div>
          <div className="battlemap" style={{ display: playerOne.isPlaying ? 'grid' : 'none' }}>
              {list.map((zone) => (
                  <BattleZone 
                  playerOne={playerOne}
                  playerTwo={playerTwo}
                  key={zone.id}
                  id={zone.id}
                  shipPlacedByPlayerOne={zone.shipPlacedByPlayerOne}
                  shipPlacedByPlayerTwo={zone.shipPlacedByPlayerTwo}
                  successfullHitFromPlayerOne={zone.successfullHitFromPlayerOne}
                  successfullHitFromPlayerTwo={zone.successfullHitFromPlayerTwo}
                  failedHitFromPlayerOne={zone.failedHitFromPlayerOne}
                  failedHitFromPlayerTwo={zone.failedHitFromPlayerTwo}
                  handleShipPlacement={handleShipPlacement}
                  handlePlayerFire={handlePlayerFire}
                  playerOneShipsLeftToPlace={playerOne.shipsLeftToPlace}
                  playerTwoShipsLeftToPlace={playerTwo.shipsLeftToPlace} />
                  ))}
          </div>
          <div className="battlemap" style={{ display: playerTwo.isPlaying ? 'grid' : 'none' }}>
              {list.map((zone) => (
                    <BattleZone 
                    playerOne={playerOne}
                    playerTwo={playerTwo}
                    key={zone.id}
                    id={zone.id}
                    shipPlacedByPlayerOne={zone.shipPlacedByPlayerOne}
                    shipPlacedByPlayerTwo={zone.shipPlacedByPlayerTwo}
                    successfullHitFromPlayerOne={zone.successfullHitFromPlayerOne}
                    successfullHitFromPlayerTwo={zone.successfullHitFromPlayerTwo}
                    failedHitFromPlayerOne={zone.failedHitFromPlayerOne}
                    failedHitFromPlayerTwo={zone.failedHitFromPlayerTwo}
                    handleShipPlacement={handleShipPlacement}
                    handlePlayerFire={handlePlayerFire}
                    playerOneShipsLeftToPlace={playerOne.shipsLeftToPlace}
                    playerTwoShipsLeftToPlace={playerTwo.shipsLeftToPlace} />
                  ))}
          </div>
          
      <h1>Shipboard of {playerOne.isPlaying ? playerOne.playerName : playerTwo.playerName}</h1>
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
        <p>{`Player One Shots Fired: ${playerOne.shotsFired}`}</p>
        <p>{`Player Two Shots Fired: ${playerTwo.shotsFired}`}</p>
        <p>{`Player One Accuracy: ${calculateAccuracy(playerOne)}%`}</p>
        <p>{`Player Two Accuracy: ${calculateAccuracy(playerTwo)}%`}</p>

        <button onClick={() => changeGameState()}>Game state</button>
        <button onClick={() => resetGame()}>Reset</button>
        <button>Statistics</button>
      </div>  
    </div>
    
    
  );
};

export default BattleMap;