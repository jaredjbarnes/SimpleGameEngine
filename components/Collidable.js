define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Collidable {
        constructor() {
            this.type = "collidable";
            this.name = null;
            this.isEnabled = true;
            this.activeCollisions = new Map();
        }
    }
    exports.default = Collidable;
});
//# sourceMappingURL=Collidable.js.map