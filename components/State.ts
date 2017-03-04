class State {
    type: string;
    activeName: string;
    name: string;
    stateManagerName: string;

    constructor(){
        this.type = "state";
        this.activeName = null;
        this.name = null;
        this.stateManagerName = null;
    } 
}

export = State;