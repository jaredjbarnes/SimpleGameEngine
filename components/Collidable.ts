class Collidable {
    type: string;
    name: string;
    isEnabled: boolean;
    isStatic: boolean;
    isInitialized: boolean;
    activeCollisions: any;

    constructor() {
        this.type = "collidable";
        this.name = null;
        this.isEnabled = true;
        this.isStatic = false;
        this.isInitialized = false;
        this.activeCollisions = {};
    }
}

export = Collidable;