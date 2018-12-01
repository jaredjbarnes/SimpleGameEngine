export default class CompositeImage {
    constructor() {
        this.type = "composite-image";
        this.id = null;
        this.images = [];
        this.isDirty = true;
    }
}