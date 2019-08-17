const schema = {
    "$id": "cursor",
    "title": "Cursor",
    "description": "Cursor",
    "type": "object",
    "isSerializable": true,
    "properties": {
        "isLeftButtonDown": {
            "type": "boolean"
        },
        "isRightButtonDown": {
            "type": "boolean"
        },
        "isMiddleButtonDown": {
            "type": "boolean"
        }
    }
};

export default class Cursor {
    constructor() {
        this.type = "cursor";
        this.isLeftButtonDown = false;
        this.isRightButtonDown = false;
        this.isMiddleButtonDown = false;
    }

    getSchema() {
        return schema;
    }
}