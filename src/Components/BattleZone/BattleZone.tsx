import React from 'react'
import './BattleZone.css'
import IBattleZone from '../../Classes/IBattleZone'



const BattleZone = (x: IBattleZone, ) => {
  return (
    
    <div className="battle-zone-container" >
        <h3>BattleZone Component</h3>
        <p>Id: {x.id}</p>
    </div>
    
  )
}

export default BattleZone