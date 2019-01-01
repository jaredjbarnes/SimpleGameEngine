export default class State {
    constructor() {
        this.type = "state";
        this.initialized = false;
        
        this.activeName = null;
        this.activeProps = {};
        
        this.name = null;
        this.props = {};
        
        this.stateManagerName = null;

    }
}