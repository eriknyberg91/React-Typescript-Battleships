

export default class IBattleZone {
    id : number;
    shipPlacedByPlayerOne: boolean;
    shipPlacedByPlayerTwo: boolean;


    constructor (id: number, shipPlacedByPlayerOne: boolean, shipPlacedByPlayerTwo: boolean) {
        this.id = id;
        this.shipPlacedByPlayerOne = shipPlacedByPlayerOne;
        this.shipPlacedByPlayerTwo = shipPlacedByPlayerTwo;

    }

}