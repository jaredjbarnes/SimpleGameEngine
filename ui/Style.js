define(["require", "exports", "Color"], function (require, exports, Color) {
    "use strict";
    class Style {
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
    return Color;
});
//# sourceMappingURL=Style.js.map