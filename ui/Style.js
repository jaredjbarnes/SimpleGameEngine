define(["require", "exports", "Color"], function (require, exports, Color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Style {
        constructor() {
            this.border.color = new Color_1.default();
            this.border.thickness = 0;
            this.backgroundColor = new Color_1.default();
            this.size.width = 0;
            this.size.height = 0;
            this.position.x = 0;
            this.position.y = 0;
            this.opacity = 1;
            this.isFixed = false;
        }
    }
    exports.default = Style;
});
//# sourceMappingURL=Style.js.map