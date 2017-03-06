define(["require", "exports"], function (require, exports) {
    "use strict";
    class TextTexture {
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
            this.lineHeight = 0;
            this.isDirty = false;
        }
    }
    return TextTexture;
});
//# sourceMappingURL=TextTexture.js.map