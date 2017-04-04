export default class Physics {
    velocity: { x: number; y: number };
    mass: number;
    friction: {x: number; y: number;};
    elasticity: number;
    activeCollisions: Array<any>;
    appliedCollisions: Array<any>;

    constructor() {
        this.velocity = {x: 0, y: 0};
        this.mass = 1;
        this.elasticity = 1;
        this.friction = {x: 0, y: 0};
        this.activeCollisions = [];
        this.appliedCollisions = [];
    }

}