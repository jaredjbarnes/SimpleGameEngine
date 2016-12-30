class State {
    type: string;
    name: string;
    stateManagerName: string;

    constructor(){
        this.type = "state";
        this.name = null;
        this.stateManagerName = null;
    } 
}

export = State;