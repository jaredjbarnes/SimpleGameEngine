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

class LogicBox {
    constructor() {
        this.type = "logic-box";
        this.conditions = [];
        this.actions = [];
    }
}

export {
    Action,
    Condition,
    LogicBox
}