export default class State {
    constructor() {
        this.type = "state";
        this.initialized = false;
        
        this.activeName = null;
        this.activeConfig = {};
        
        this.name = null;
        this.config = {};
        
        this.stateManagerName = null;

    }
}