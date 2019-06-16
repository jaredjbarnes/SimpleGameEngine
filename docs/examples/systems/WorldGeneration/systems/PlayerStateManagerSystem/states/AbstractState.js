import State from "../../../../../../../src/systems/StateManagerSystem/State";

const UP = 38;
const LEFT = 37;
const RIGHT = 39;
const DOWN = 40;

export default class AbstractState extends State {

    updateStateFromKeyboardInput() {
        const entity = this.entity;
        const state = this.state;
        const keyboardInput = entity.getComponent("keyboard-input");

        if (keyboardInput.pressedKeys[UP]) {
            state.name = "running-up";
        } else if (keyboardInput.pressedKeys[DOWN]) {
            state.name = "running-down";
        } else if (keyboardInput.pressedKeys[LEFT]) {
            state.name = "running-left";
        } else if (keyboardInput.pressedKeys[RIGHT]) {
            state.name = "running-right";
        } else {
            if (state.name.indexOf("idle") >= 0) {
                return;
            }

            if (state.name === "running-up") {
                state.name = "idle-up";
            } else if (state.name === "running-down") {
                state.name = "idle-down";
            } else if (state.name === "running-right") {
                state.name = "idle-right";
            } else if (state.name === "running-left") {
                state.name = "idle-left";
            } else {
                state.name = "idle-down";
            }
        }


    }

    update() {
        this.updateStateFromKeyboardInput();
    }
}