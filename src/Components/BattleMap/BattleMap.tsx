import React from 'react'
import BattleZone from '../BattleZone/BattleZone'
import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css'

interface Props {
    list: IBattleZone[];
    handleClick(x: number): void;
}


const BattleMap = ({list, handleClick} : Props) => {
  return (
    <div className="battle-map-container">
        
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
  )
}

export default BattleMap