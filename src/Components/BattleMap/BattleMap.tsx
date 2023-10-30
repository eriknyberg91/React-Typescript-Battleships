import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css';
import IPlayer from '../../Classes/IPlayer';
import BattleZone from '../BattleZone/BattleZone';
import { useState } from 'react';

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
  showShips: boolean;
  handleShips(): void;
}

const BattleMap = ({showShips, handleShips, list,playerOne, playerTwo, gameIsPlaying, handleShipPlacement, changePlayer, handlePlayerFire, changeGameState, resetGame, calculateAccuracy}: Props) => {
  
  

  return (
    <div className="battle-map-container" >
          <div className="battle-maps-container"style={{display: gameIsPlaying ? 'block' : 'none'}}>
          
            <div className="intro-container">
              <h2>Current Player: {playerOne.isPlaying ? playerOne.playerName : playerTwo.playerName}</h2>
              <button onClick={() => handleShips()}>Show ships</button>
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
                    playerTwoShipsLeftToPlace={playerTwo.shipsLeftToPlace}
                    showShips={showShips} />
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
                      playerTwoShipsLeftToPlace={playerTwo.shipsLeftToPlace}
                      showShips={showShips} />
                    ))}
              </div>
      </div>
      

      <div className="end-game-container" style={{display: gameIsPlaying ? 'none' : 'flex' }}>
        <h1>Game has ended.</h1>
        <h3>Shots fired:</h3>
        <p>{`PlayerOne ---  ${playerOne.shotsFired} | ${playerOne.shotsFired} --- PlayerTwo`}</p>
        <h3>Accuracy:</h3>
        <p>{`Player One --- ${calculateAccuracy(playerOne)}% | ${calculateAccuracy(playerTwo)}% --- PlayerTwo`}</p>
        
        <button className='play-again-button' onClick={() => resetGame()}>Play again!</button>
      </div>  
    </div>
    
    
  );
};

export default BattleMap;