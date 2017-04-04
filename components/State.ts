export default class State {
    activeOptions: any;
    activeName: string;
    type: string;
    name: string;
    stateManagerName: string;
    options: any;

    constructor() {
        this.type = "state";
        this.activeName = null;
        this.name = null;
        this.stateManagerName = null;
        this.options = {};
        this.activeOptions = {};
    }
}