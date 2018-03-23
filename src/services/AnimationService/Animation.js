export default class Animation {
    constructor() {
        this.target = null;
        this.property = null;
        this.propertyAccessors = [];
        this.startTime = 0;
        this.duration = 0;
        this.easing = "linear";
        this.startValue = 0;
        this.endValue = 0;
        this.repeat = 1;
        this.iterations = 0;
        this.direction = 0;
        this.repeatDirection = 0;
        this.progress = 0;
        this.isComplete = false;
        this.isInteger = false;
    }
}