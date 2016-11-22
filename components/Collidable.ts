class Collidable {
    type: string;
    name: string;
    isEnabled: boolean;
    isStatic: boolean;
    activeCollisions: any;

    constructor() {
        this.type = "collidable";
        this.name = null;
        this.isEnabled = true;
        this.isStatic = false;
        this.activeCollisions = {};
    }
}

export = Collidable;