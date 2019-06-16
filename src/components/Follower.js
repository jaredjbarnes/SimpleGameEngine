const position = {
    "type": "object",
    "properties": {
        "x": {
            "type": "number"
        },
        "y": {
            "type": "number"
        }
    }
};

const schema = {
    "$id": "follower",
    "title": "Follower",
    "description": "Follower",
    "type": "object",
    "properties": {
        "leaderEntityId": {
            "type": "string"
        },
        "maxSpeed": {
            "type": "integer"
        },
        "distance": position,
        "lastDirection": position
    }
};


export default class Follower {
    constructor() {
        this.type = "follower";
        this.leaderEntityId = null;
        this.maxSpeed = 2;
        this.distance = {
            x: 0,
            y: 0
        }
        this.lastDirection = {
            x: 1,
            y: 1
        };
    }

    getSchema(){
        return schema;
    }
}