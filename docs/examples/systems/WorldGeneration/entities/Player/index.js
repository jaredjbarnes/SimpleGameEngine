import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import RectangleCollider from "../../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../../src/components/Rectangle";
import SpatialPartition from "../../../../../../src/components/SpatialPartition";
import Sprite from "../../../../../../src/components/Sprite";
import State from "../../../../../../src/components/State";
import SpriteSet from "../../../../../../src/components/SpriteSet";
import ZIndex from "../../../../../../src/components/ZIndex";
import KeyboardInput from "../../../../../../src/components/KeyboardInput";
import runningDownSpriteSet from "./runningDownSpriteSet";
import runningUpSpriteSet from "./runningUpSpriteSet";
import runningRightSpriteSet from "./runningRightSpriteSet";
import runningLeftSpriteSet from "./runningLeftSpriteSet";
import idleDownSpriteSet from "./idleDownSpriteSet";
import idleUpSpriteSet from "./idleUpSpriteSet";
import idleLeftSpriteSet from "./idleLeftSpriteSet";
import idleRightSpriteSet from "./idleRightSpriteSet";

export default class Player extends Entity {
    constructor() {
        super();
        this.id = "player";
        this.type = "player";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();
        const rectangle = new Rectangle();
        const keyboardInput = new KeyboardInput();
        const sprite = new Sprite();
        const state = new State();
        const spriteSet = new SpriteSet();
        const zIndex = new ZIndex();

        state.name = "initialize";
        state.props = {
            animationFrameIndex: 0
        };
        state.stateManagerName = "player";

        spriteSet.sets["running-up"] = runningUpSpriteSet;
        spriteSet.sets["running-down"] = runningDownSpriteSet;
        spriteSet.sets["running-left"] = runningLeftSpriteSet;
        spriteSet.sets["running-right"] = runningRightSpriteSet;
        spriteSet.sets["idle-up"] = idleUpSpriteSet;
        spriteSet.sets["idle-down"] = idleDownSpriteSet;
        spriteSet.sets["idle-left"] = idleLeftSpriteSet;
        spriteSet.sets["idle-right"] = idleRightSpriteSet;

        sprite.timeScale = 0.15;

        zIndex.value = 2;

        rectangle.width = 32;
        rectangle.height = 54;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(keyboardInput);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(sprite);
        this.addComponent(spriteSet);
        this.addComponent(state);
        this.addComponent(zIndex);
    }
}