import './BattleZone.css';
import IPlayer from '../../Classes/IPlayer';
import { useState } from 'react';

interface Props {
  id: number;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  shipPlacedByPlayerOne: boolean;
  shipPlacedByPlayerTwo: boolean;
  successfullHitFromPlayerOne: boolean;
  successfullHitFromPlayerTwo: boolean;
  failedHitFromPlayerOne: boolean;
  failedHitFromPlayerTwo: boolean;
  handleShipPlacement(id: number): void;
  handlePlayerFire(id: number): void;
  playerOneShipsLeftToPlace: number;
  playerTwoShipsLeftToPlace: number;
  showShips: boolean;
}

const BattleZone = ({showShips, id,playerOne,playerTwo,shipPlacedByPlayerOne,shipPlacedByPlayerTwo,successfullHitFromPlayerOne,successfullHitFromPlayerTwo,failedHitFromPlayerOne,failedHitFromPlayerTwo,handleShipPlacement,handlePlayerFire,playerOneShipsLeftToPlace,playerTwoShipsLeftToPlace,}: Props) => {
  

  return (
    <div className="battle-zone-container" onClick={() => {playerOne.shipsLeftToPlace === 0 && playerTwo.shipsLeftToPlace === 0 && !showShips ? handlePlayerFire(id) : handleShipPlacement(id)}}>
      <p>{id}</p>
      {playerOne.isPlaying && (
        
          <div className="action-container">
            
            <div className="player-hit-container" style={{display: successfullHitFromPlayerOne ? 'block' : 'none'  }}>
              <p style={{ color: successfullHitFromPlayerOne ? 'green' : 'white' }}>Hit</p>
            </div>
            <div className="player-miss-container" style={{display: failedHitFromPlayerOne ? 'block' : 'none'}}>
                <p style={{ color: failedHitFromPlayerOne ? 'red' : 'white' }}>Miss</p>
            </div>

            <div className="show-ships-container" style={{display: showShips ? 'block' : 'none'}}>
              <p style={{color: shipPlacedByPlayerOne ? 'green' : 'white'}}>Place Ship</p>
            </div>
          
          </div>
          
        
      )}
      {playerTwo.isPlaying && (
        <div className="action-container">
            
        <div className="player-hit-container" style={{display: successfullHitFromPlayerTwo ? 'block' : 'none'  }}>
          <p style={{ color: successfullHitFromPlayerTwo ? 'green' : 'white' }}>Hit</p>
        </div>
        <div className="player-miss-container" style={{display: failedHitFromPlayerTwo ? 'block' : 'none'}}>
            <p style={{ color: failedHitFromPlayerTwo ? 'red' : 'white' }}>Miss</p>
        </div>

        <div className="show-ships-container" style={{display: showShips ? 'block' : 'none'}}>
          <p style={{color: shipPlacedByPlayerTwo ? 'green' : 'white'}}>Place Ship</p>
        </div>
      
      </div>
      )}
    </div>
  );
};

export default BattleZone;