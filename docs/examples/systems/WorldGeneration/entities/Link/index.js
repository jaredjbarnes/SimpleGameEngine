import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import RectangleCollider from "../../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../../src/components/Rectangle";
import Movable from "../../../../../../src/components/Movable";
import SpatialPartition from "../../../../../../src/components/SpatialPartition";
import Sprite from "../../../../../../src/components/Sprite";
import PolygonBody from "../../../../../../src/components/PolygonBody";
import Polygon from "../../../../../../src/components/Polygon";
import PolygonCollider from "../../../../../../src/components/PolygonCollider";
import SolidBody from "../../../../../../src/components/SolidBody";
import SpatialPartition from "../../../../../../src/components/SpatialPartition";
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
import CenterPoint from "../../components/CenterPoint";

export default class Link extends Entity {
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
        const body = new PolygonBody();
        const polygon = new Polygon();
        const polygonCollider = new PolygonCollider();
        const solidBody = new SolidBody();
        const centerPoint = new CenterPoint();
        const movable = new Movable();

        polygon.points.push({
            x: 0,
            y: 28
        }, {
            x: 17,
            y: 28
        }, {
            x: 17,
            y: 34
        }, {
            x: 0,
            y: 34
        }, {
            x: 0,
            y: 28
        });

        body.polygons.push(polygon);

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

        sprite.timeScale = 0.3;

        zIndex.value = 2;

        rectangle.width = 17;
        rectangle.height = 34;

        centerPoint.x = 17;
        centerPoint.y = 28;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(keyboardInput);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(sprite);
        this.addComponent(spriteSet);
        this.addComponent(state);
        this.addComponent(zIndex);
        this.addComponent(body);
        this.addComponent(solidBody);
        this.addComponent(polygonCollider);
        this.addComponent(centerPoint);
        this.addComponent(movable);
    }
}