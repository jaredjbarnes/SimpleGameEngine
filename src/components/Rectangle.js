export default class Rectangle {
    constructor() {
        this.type = "rectangle";
        this.width = 0;
        this.height = 0;
        this.top = 0;
        this.left = 0;
        this.bottom = 0;
        this.right = 0;
        this.transformedWidth = 0;
        this.transformedHeight = 0;
        this.isDirty = true;
    }
}