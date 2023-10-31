import React from 'react'
import IPlayer from '../../Classes/IPlayer'
import './Scoreboard.css';
interface Props {
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
}
//En scoreboard med två spelare och information om spelare som hälsa, skepp, namn.
const Scoreboard = ({firstPlayer, secondPlayer} : Props) => {
  
    const healthIcons = (health: number) => {
        const icons = [];
        for (let i = 0;  i < health; i++) {
            icons.push(<button key={i} className='health-button'></button>);
        }
        return icons;
    }
  
    return (
    <div className='scoreboard-container'>
        <div className="first-player-container">
            <h3>{firstPlayer.playerName}</h3>
            <p>Wins {`(${firstPlayer.numberOfVictories})`}</p>
            <p>Health: {healthIcons(firstPlayer.health)}</p>
            <p>Ships {`(${firstPlayer.shipsLeftToPlace})`}</p>
        </div>

        <div className="title-and-gamephase">
            <h1>Battleships</h1>
        </div>

        <div className="second-player-container">
            <h3>{secondPlayer.playerName}</h3>
            <p>Wins {`(${secondPlayer.numberOfVictories})`}</p>
            <p>Health: {healthIcons(secondPlayer.health)}</p>
            <p>Ships {`(${secondPlayer.shipsLeftToPlace})`}</p>
        </div>
    </div>
  )
}

export default Scoreboard