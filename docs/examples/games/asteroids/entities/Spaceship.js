import Entity from "../../../../../src/Entity";
import Transform from "../../../../../components/Transform";
import Rectangle from "../../../../../components/Rectangle";
import RectangleCollider from "../../../../../components/RectangleCollider";
import State from "../../../../../components/State";
import SpaceRigidBody from "../../../../../components/SpaceRigidBody";

export default class Spaceship extends Entity {
    constructor(){
        super();
        this.type = "spaceship";

        const transform = new Transform();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();
        const state = new State();
        const spaceRigidBody = new SpaceRigidBody();

        state.name = "drift";
        state.stateManagerName = "spaceship";

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(state);
        this.addComponent(spaceRigidBody);
    }
}