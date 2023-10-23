import React, { useEffect } from 'react';
import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css';
import IPlayer from '../../Classes/IPlayer';

interface Props {
  list: IBattleZone[];
  handleClick(id: number): void;
  handleShipPlacement(id: number, currentPlayer: IPlayer): void;
  changePlayer(): void;
  handlePlayerFire(id: number): void;
  playerOne: IPlayer;
  playerTwo: IPlayer;

}

const BattleMap = ({list,playerOne, playerTwo, handleClick,handleShipPlacement, changePlayer, handlePlayerFire}: Props) => {

  return (
    <div className="battle-map-container">
      <div className="intro-container">
      <h2>Current Player: {playerOne.isPlaying ? playerOne.playerName : playerTwo.playerName}</h2>
        <button onClick={() => changePlayer()}>Change Player</button>
      </div>
      <div className="battlemap">
        {list.map((zone) => (
          <div className="battle-zone" >
            <h6>{zone.id}</h6>
            <p >Battle Zone</p>
            <p>Hit</p>
            <p>Miss</p>
            <button onClick={() => handleClick(zone.id)}>Ship</button>
            <button onClick={() => handlePlayerFire(zone.id)}>Fire</button>
          </div>
        ))}
      </div>
      <br />
      <h1>PlayerOne</h1>
      <div className="battlemap">
        {list.map((zone) => (
          <div
            className="battle-zone"
            onClick={() => handleClick(zone.id)}
            style={{ backgroundColor: zone.shipPlacedByPlayerOne ? 'black' : 'white' }}>
            <h6>{zone.id}</h6>
            <p>Battle Zone</p>
            <p style={{color: zone.successfullHitFromPlayerOne ? 'green' : 'white'}}>Hit</p>
            <p style={{color: zone.failedHitFromPlayerOne ? 'red' : 'white'}}>Miss</p>
          </div>
        ))}
      </div>
      <h1>PlayerTwo</h1>
      <div className="battlemap">
        {list.map((zone) => (
          <div
            className="battle-zone"
            onClick={() => handleClick(zone.id)}
            style={{ backgroundColor: zone.shipPlacedByPlayerTwo ? 'black' : 'white' }}>
            <h6>{zone.id}</h6>
            <p>Battle Zone</p>
            <p style={{color: zone.successfullHitFromPlayerTwo ? 'green' : 'white'}}>Hit</p>
            <p style={{color: zone.failedHitFromPlayerTwo ? 'red' : 'white'}}>Miss</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleMap;