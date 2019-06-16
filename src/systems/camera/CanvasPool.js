export default class CanvasPool {
    constructor(canvasFactory) {
        this.available = [];
        this.canvasFactory = canvasFactory;
    }

    acquire() {
        if (this.available.length > 0) {
            return this.available.pop();
        } else {
            return this.canvasFactory.create();
        }
    }

    release(canvas) {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        this.available.push(canvas);
    }
}