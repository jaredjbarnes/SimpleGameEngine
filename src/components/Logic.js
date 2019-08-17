const action = {
    "type": "object",
    "properties": {
        "entityId": {
            "type": "string"
        },
        "options": {
            "type": "object"
        }
    }
}

const condition = {
    "type": "object",
    "properties": {
        "entityId": {
            "type": "string"
        },
        "stateNames": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    }
}

const schema = {
    "$id": "logic",
    "title": "Logic",
    "description": "Logic",
    "type": "object",
    "isSerializable": true,
    "properties": {
        "name": {
            "type": "string"
        },
        "isDisabled": {
            "type": "boolean"
        },
        "conditions": {
            "type": "array",
            "items": {
                "type": action
            }
        }
    }
};

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
        this.isDisabled = false;
        this.conditions = [];
        this.actions = [];
    }

    getSchema(){
        return schema;
    }
}

export {
    Action,
    Condition,
    Logic
}