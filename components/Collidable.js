define(["require", "exports"], function (require, exports) {
    "use strict";
    class Collidable {
        constructor() {
            this.type = "collidable";
            this.name = null;
            this.isEnabled = true;
            this.activeCollisions = new Map();
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Collidable;
});
//# sourceMappingURL=Collidable.js.map