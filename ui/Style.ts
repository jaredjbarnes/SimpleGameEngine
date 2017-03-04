import Color = require("Color");

class Style {
    backgroundColor: Color;
    border: {
        thickness: number;
        color: Color;
    };
    position: { x: number; y: number; };
    isFixed: boolean;
    size: { width: number; height: number; };
    cornerRadius: number;
    opacity: number;

    constructor() {
        this.border.color = new Color();
        this.border.thickness = 0;
        this.backgroundColor = new Color();
        this.size.width = 0;
        this.size.height = 0;
        this.position.x = 0;
        this.position.y = 0;
        this.opacity = 1;
        this.isFixed = false;
    }
}

export = Color;