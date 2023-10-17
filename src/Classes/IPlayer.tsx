export default class IPlayer {
    name: string;
    shotsFired: number;
    shipsLeftToPlace: number;
    numberOfVictories: number;

    constructor (name: string, shotsFired: number, shipsLeftToPlace: number, numberOfVictories: number){
        this.name = name;
        this.shotsFired = shotsFired;
        this.shipsLeftToPlace = shipsLeftToPlace;
        this.numberOfVictories = numberOfVictories;
    }
}