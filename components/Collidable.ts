class Collidable {
    type: string;
    name: string;
    isEnabled: boolean;
    isStatic: boolean;
    activeCollisions: Map<string, any>;

    constructor() {
        this.type = "collidable";
        this.name = null;
        this.isEnabled = true;
        this.activeCollisions = new Map();
    }
}

export = Collidable;