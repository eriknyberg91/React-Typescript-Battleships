export default class IPlayer {
    id: number;
    playerName: string;
    shotsFired: number;
    shipsLeftToPlace: number;
    health: number;
    numberOfVictories: number;
    isPlaying: boolean;

    constructor (id: number, playerName: string, shotsFired: number, shipsLeftToPlace: number, numberOfVictories: number, health: number, isPlaying: boolean){
        this.id = id;
        this.playerName = playerName;
        this.shotsFired = shotsFired;
        this.shipsLeftToPlace = shipsLeftToPlace;
        this.numberOfVictories = numberOfVictories;
        this.health = health;
        this.isPlaying = isPlaying;
    }
}