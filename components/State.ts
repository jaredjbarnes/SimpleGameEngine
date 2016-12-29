class State {
    type: string;
    currentStateName:string;
    previousStateName: string;
    constructor(){
        this.type = "state";
        this.currentStateName= null;
        this.previousStateName = null;
    } 
}

export = State;