

export default class IBattleZone {
    id : number;
    isClicked : boolean;
    clickedByPlayerOne: boolean;
    clickedByPlayerTwo: boolean;


    constructor (id: number, isClicked: boolean, clickedByPlayerOne: boolean, clickedByPlayerTwo: boolean) {
        this.id = id;
        this.isClicked = isClicked;
        this.clickedByPlayerOne = clickedByPlayerOne;
        this.clickedByPlayerTwo = clickedByPlayerTwo;

    }

}