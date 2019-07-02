export default class CanvasPool {
    constructor() {
        this.available = [];
    }

    acquire() {
        if (this.available.length > 0) {
            return this.available.pop();
        } else {
            return document.createElement("canvas");
        }
    }

    release(canvas) {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        this.available.push(canvas);
    }
}