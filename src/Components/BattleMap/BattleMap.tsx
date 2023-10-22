import IBattleZone from '../../Classes/IBattleZone';
import './BattleMap.css'
import IPlayer from '../../Classes/IPlayer';

interface Props {
    list: IBattleZone[];
    currentPlayer: IPlayer;
    handleClick(id: number): void;
    handleShipPlacement(id: number, currentPlayer: IPlayer): void
    changeActivePlayer(): void;
}


const BattleMap = ({list, currentPlayer, handleClick, handleShipPlacement, changeActivePlayer} : Props) => {
  return (
    
    
    <div className="battle-map-container">
     <div className="intro-container">
      <h3>Active Player: {currentPlayer?.playerName + currentPlayer.shipsLeftToPlace} </h3>
      <button onClick={() => changeActivePlayer()}>changeActivePlayer</button>
      </div>  
      
      <div className="battlemap">
      {list.map((zone) => (
            <div className="battle-zone" 
              onClick={() => handleShipPlacement(zone.id, currentPlayer)}>
                <h6>{zone.id}</h6>
                <p>Battle Zone</p>
            </div>
        ))}
      </div> 
      <br />
      <h1>PlayerOne</h1>
      <div className="battlemap">
      {list.map((zone) => (
            <div className="battle-zone" 
              onClick={() => handleShipPlacement(zone.id, currentPlayer)}
              style={{backgroundColor: zone.shipPlacedByPlayerOne ? "green" : "white"}}>
                <h6>{zone.id}</h6>
                <p>Battle Zone</p>
          </div>
        ))}
      </div> 
      <h1>PlayerTwo</h1>
      <div className="battlemap">
      {list.map((zone) => (
            <div className="battle-zone" 
              onClick={() => handleShipPlacement(zone.id, currentPlayer)}
              style={{backgroundColor: zone.shipPlacedByPlayerTwo ? "blue" : "white"}}>
                <h6>{zone.id}</h6>
                <p>Battle Zone</p>
          </div>
        ))}
      </div> 
      
    </div>
  )
}

export default BattleMap