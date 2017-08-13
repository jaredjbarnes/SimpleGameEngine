export default class Physics {
    constructor() {
        this.type = "physics";
        this.velocity = { x: 0, y: 0 };
        this.mass = 1;
        this.elasticity = 1;
        this.friction = { x: 0, y: 0 };
        this.lastPosition = { x: 0, y: 0 };
    }

}