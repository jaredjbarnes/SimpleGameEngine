export default class TextTexture {
    constructor() {
        this.type = "text-texture";
        this.font = {
            size: 12,
            style: "normal",
            family: "arial",
            weight: "normal",
            baseline: "top",
            variant: "normal",
            color: {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1
            }
        };

        this.text = "";
        this.verticalAlignment = "top";
        this.horizontalAlignment = "left";
        this.width = 0;
        this.height = 0;
        this.lineHeight = 0;
        this.isDirty = false;
    }
}