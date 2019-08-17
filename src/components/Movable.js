const schema = {
    "$id": "movable",
    "title": "Movable",
    "description": "Movable",
    "type": "object",
    "isSerializable": true,
    "properties": {
        "x": {
            "type": "number"
        },
        "y": {
            "type": "number"
        }
    }
};

export default class Movable {
    constructor() {
        this.type = "movable";
        this.x = 0;
        this.y = 0;
    }

    getSchema(){
        return schema;
    }
}