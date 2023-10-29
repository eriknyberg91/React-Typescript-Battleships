import React from 'react';
import './BattleZone.css';
import IBattleZone from '../../Classes/IBattleZone';
import IPlayer from '../../Classes/IPlayer';

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
}

const BattleZone = ({id,playerOne,playerTwo,shipPlacedByPlayerOne,shipPlacedByPlayerTwo,successfullHitFromPlayerOne,successfullHitFromPlayerTwo,failedHitFromPlayerOne,failedHitFromPlayerTwo,handleShipPlacement,handlePlayerFire,playerOneShipsLeftToPlace,playerTwoShipsLeftToPlace,}: Props) => {


  return (
    <div className="battle-zone-container" onClick={() => {playerOne.shipsLeftToPlace > 0 || playerTwo.shipsLeftToPlace > 0 ? handleShipPlacement(id) : handlePlayerFire(id)}}>
      <h3>BattleZone Component</h3>
      <p>Id: {id}</p>
      {playerOne.isPlaying && (
        <>
          <p style={{ color: successfullHitFromPlayerOne ? 'green' : 'white' }}>Hit</p>
          <p style={{ color: failedHitFromPlayerOne ? 'red' : 'white' }}>Miss</p>
        </>
      )}
      {playerTwo.isPlaying && (
        <>
          <p style={{ color: successfullHitFromPlayerTwo ? 'green' : 'white' }}>Hit</p>
          <p style={{ color: failedHitFromPlayerTwo ? 'red' : 'white' }}>Miss</p>
        </>
      )}
    </div>
  );
};

export default BattleZone;