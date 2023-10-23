

export default class IBattleZone {
    id : number;
    shipPlacedByPlayerOne: boolean;
    shipPlacedByPlayerTwo: boolean;
    successfullHitFromPlayerOne: boolean;
    successfullHitFromPlayerTwo: boolean;
    failedHitFromPlayerOne: boolean;
    failedHitFromPlayerTwo: boolean;

    constructor (
        id: number, 
        shipPlacedByPlayerOne: boolean, 
        shipPlacedByPlayerTwo: boolean,
        successfullHitFromPlayerOne: boolean,
        successfullHitFromPlayerTwo: boolean,
        failedHitFromPlayerOne: boolean,
        failedHitFromPlayerTwo: boolean,

        ) 
        
        {
        this.id = id;
        this.shipPlacedByPlayerOne = shipPlacedByPlayerOne;
        this.shipPlacedByPlayerTwo = shipPlacedByPlayerTwo;
        this.successfullHitFromPlayerOne = successfullHitFromPlayerOne;
        this.successfullHitFromPlayerTwo = successfullHitFromPlayerTwo;
        this.failedHitFromPlayerOne = failedHitFromPlayerOne;
        this.failedHitFromPlayerTwo = failedHitFromPlayerTwo;

    }

}