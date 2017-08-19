import StateManagerSystem from "./../../../../systems/StateManagerSystem";
import Link from "./../entities/Link";
import PushDown from "./linkStates/PushDown";
import PushLeft from "./linkStates/PushLeft";
import PushRight from "./linkStates/PushRight";
import PushUp from "./linkStates/PushUp";
import StandDown from "./linkStates/StandDown";
import StandLeft from "./linkStates/StandLeft";
import StandUp from "./linkStates/StandUp";
import StandRight from "./linkStates/StandRight";
import StrikeDown from "./linkStates/StrikeDown";
import StrikeLeft from "./linkStates/StrikeLeft";
import StrikeRight from "./linkStates/StrikeRight";
import StrikeUp from "./linkStates/StrikeUp";
import WalkDown from "./linkStates/WalkDown";
import WalkLeft from "./linkStates/WalkLeft";
import WalkRight from "./linkStates/WalkRight";
import WalkUp from "./linkStates/WalkUp";

export default class PlayerStateManager extends StateManagerSystem {
    constructor() {
        super();
        this.game = null;
        this.link = new Link();

        this.addState("push-down", new PushDown(link));
        this.addState("push-left", new PushLeft(link));
        this.addState("push-right", new PushRight(link));
        this.addState("push-up", new PushUp(link));
        this.addState("stand-down", new StandDown(link));
        this.addState("stand-left", new StandLeft(link));
        this.addState("stand-right", new StandRight(link));
        this.addState("stand-up", new StandUp(link));
        this.addState("strike-down", new StrikeDown(link));
        this.addState("strike-left", new StrikeLeft(link));
        this.addState("strike-right", new StrikeRight(link));
        this.addState("strike-up", new StrikeUp(link));
        this.addState("walk-down", new WalkDown(link));
        this.addState("walk-left", new WalkLeft(link));
        this.addState("walk-right", new WalkRight(link));
        this.addState("walk-up", new WalkUp(link));
    }

    activated(game) {
        super.activated(game);

        this.game = game;
        this.game.addEntity(link);
    }

    deactivated() {
        super.deactivated();
        this.game.removeEntity(link);
        this.game = null;

    }
}