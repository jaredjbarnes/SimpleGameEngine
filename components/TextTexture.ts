class TextTexture {
    type: string;
    text: string;
    verticalAlignment: string;
    horizontalAlignment: string;

    font: {
        size: number;
        style: string;
        family: string;
        weight: string;
        baseline: string;
        variant: string;
        color: {
            red: number;
            green: number;
            blue: number;
            opacity: number;
        }
    }

    isDirty: boolean;

    constructor() {
        this.type = "text-texture";
        this.font = {
            size: 12,
            style: "normal",
            family: "arial",
            weight: "normal",
            baseline: "alphabetic",
            variant: "normal",
            color: {
                red: 0,
                green: 0,
                blue: 0,
                opacity: 1
            }
        };

        this.text = "";
        this.verticalAlignment = "top";
        this.horizontalAlignment = "left";
        this.isDirty = false;
    }
}

export = TextTexture;