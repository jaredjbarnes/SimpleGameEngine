﻿class KeyboardInput {
    type: string;
    pressedKeys: any;

    constructor() {
        this.type = "keyboard-input";
        this.pressedKeys = {};
    }
}

export = KeyboardInput;