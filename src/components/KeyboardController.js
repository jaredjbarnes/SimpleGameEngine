const schema = {
    "$id": "keyboard-controller",
    "title": "Keyboard Controller",
    "description": "Keyboard Controller",
    "type": "object",
    "isSerializable": false,
    "properties": {}
};

export default class KeyboardController {
    constructor() {
        this.type = "keyboard-controller";
    }

    getSchema(){
        return schema;
    }
}