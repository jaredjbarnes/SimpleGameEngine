export default class Line {
    constructor() {
        this.type = "line";
        this.thickness = 1;
        this.color = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
        };
        this.to = {
            x: 0,
            y: 0
        }
        this.from = {
            x: 0,
            y: 0
        }
        this.isDirty = false;
    }
}