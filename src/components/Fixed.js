const schema = {
    "$id": "fixed",
    "title": "Fixed",
    "description": "Fixed",
    "type": "object",
    "isSerializable": true,
    "properties": {
        "position": {
            "type": "object",
            "properties": {
                "x": {
                    "type": "number"
                },
                "y": {
                    "type": "number"
                }
            }
        }
    }
};

export default class Fixed {
    constructor() {
        this.type = "fixed";
        this.position = {
            x: 0,
            y: 0
        };
    }

    getSchema(){
        return schema;
    }
}