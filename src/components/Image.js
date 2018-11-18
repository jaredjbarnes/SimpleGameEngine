export default class Image {
    constructor() {
        this.type = "image";
        this.id = null;
        this.url = null;
        this.position = {
            x: 0,
            y: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        this.padding = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.opacity = 1;
        this.zIndex = 0;
        this.flipHorizontally = false;
        this.flipVertically = false;
        this.isDirty = true;
    }
}