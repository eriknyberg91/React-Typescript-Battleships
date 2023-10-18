import React from 'react'
import BattleZone from '../BattleZone/BattleZone'
import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css'
import IPlayer from '../../Classes/IPlayer';

interface Props {
    list: IBattleZone[];
    currentPlayer: IPlayer;
    handleClick(x: number): void;
    setActivePlayer(): void;
    changeActivePlayer(id: number): void;
}


const BattleMap = ({list, currentPlayer, handleClick, setActivePlayer, changeActivePlayer} : Props) => {
  return (
    
    
    <div className="battle-map-container">
     <div className="intro-container">
      <h3>Active Player: {currentPlayer?.playerName} </h3>
      <button onClick={setActivePlayer}>setActivePlayer</button>
      <button onClick={() => changeActivePlayer(currentPlayer.id)}>changeActivePlayer</button>
      </div>  
      <div className="battlemap">
        
      {list.map((zone) => (
            <div className="battle-zone" 
              onClick={() => handleClick(zone.id)}
              style={{backgroundColor: zone.isClicked ? "red" : "white"}}>
                <h6>{zone.id}</h6>
                <p>{zone.isClicked}</p>
                <p>Battle Zone</p>
            </div>
        ))}
      </div> 
        

    </div>
  )
}

export default BattleMap