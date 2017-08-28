class Action {
    constructor() {
        this.entityId = null;
        this.stateName = null;
        this.options = {};
    }
}

class Condition {
    constructor() {
        this.entityId = null;
        this.stateNames = [];
    }
}

class Logic {
    constructor() {
        this.type = "logic";
        this.name = null;
        this.conditions = [];
        this.actions = [];
    }
}

export {
    Action,
    Condition,
    Logic
}