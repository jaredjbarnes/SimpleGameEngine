const schema = {
    "$id": "keyboard-input",
    "title": "Keyboard Input",
    "description": "Keyboard Input",
    "type": "object",
    "properties": {
        "pressedKeys": {
            "type": "object"
        }
    }
};

export default class KeyboardInput {
   constructor() {
        this.type = "keyboard-input";
        this.pressedKeys = {};
    }

    getSchema(){
        return schema;
    }
}