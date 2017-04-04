export default class Position {
    type: string;
    x: number;
    y: number;
    isStatic: boolean;
    isDirty: boolean;

    constructor() {
        this.type = "position";
        this.x = 0;
        this.y = 0;
        this.isStatic = false;
        this.isDirty = false;
    }
}