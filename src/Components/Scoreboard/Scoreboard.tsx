import React from 'react'
import IPlayer from '../../Classes/IPlayer'
import './Scoreboard.css';
interface Props {
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
}

const Scoreboard = ({firstPlayer, secondPlayer} : Props) => {
  return (
    <div className='scoreboard-container'>
        <div className="first-player-container">
            <h3>{firstPlayer.playerName}</h3>
            <p>Wins {`(${firstPlayer.numberOfVictories})`}</p>
            <p>Health {firstPlayer.health}</p>
        </div>

        <div className="title-and-gamephase">
            <h3>Battleships</h3>
        </div>

        <div className="second-player-container">
            <h3>{secondPlayer.playerName}</h3>
            <p>Wins {`(${secondPlayer.numberOfVictories})`}</p>
            <p>Health {secondPlayer.health}</p>
        </div>
    </div>
  )
}

export default Scoreboard