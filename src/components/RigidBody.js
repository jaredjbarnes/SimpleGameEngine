export default class RigidBody {
    constructor() {
        this.type = "rigid-body";
        this.velocity = { x: 0, y: 0 };
        this.angularSpeed = 0;
        this.force = { x: 0, y: 0 };
        this.mass = 1;
        this.elasticity = 1;
        this.density = 0.001;
        this.torque = 0;
        this.friction = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
        this.lastPosition = { x: 0, y: 0 };
    }

}