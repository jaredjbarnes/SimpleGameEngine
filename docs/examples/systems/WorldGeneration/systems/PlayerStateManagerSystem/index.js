import StateManagerSystem from "../../../../../../src/systems/StateManagerSystem";
import IdleDown from "./states/IdleDown";
import IdleUp from "./states/IdleUp";
import IdleRight from "./states/IdleRight";
import IdleLeft from "./states/IdleLeft";
import RunningDown from "./states/RunningDown";
import RunningUp from "./states/RunningUp";
import RunningLeft from "./states/RunningLeft";
import RunningRight from "./states/RunningRight";
import Initialize from "./states/Initialize";

export default class PlayerStateManager extends StateManagerSystem {
    constructor() {
        super();

        this.name = "player";

        this.addState(new IdleDown);
        this.addState(new IdleUp);
        this.addState(new IdleRight);
        this.addState(new IdleLeft);
        this.addState(new RunningDown);
        this.addState(new RunningUp);
        this.addState(new RunningLeft);
        this.addState(new RunningRight);
        this.addState(new Initialize);

    }

}