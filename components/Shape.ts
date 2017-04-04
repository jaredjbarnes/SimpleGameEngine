export default class Shape {
    type: string;
    fillColor: { red: number; green: number; blue: number; alpha: number };
    border: { thickness: number; color: { red: number; green: number; blue: number; alpha: number; } }
    points: Array<{ x: number; y: number; }>

    constructor() {
        this.type = "shape";

        this.fillColor = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0
        };

        this.border = {
            thickness: 0,
            color: {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 0
            }
        };

        this.points = [];

    }
}