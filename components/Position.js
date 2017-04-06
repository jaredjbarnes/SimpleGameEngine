define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Position {
        constructor() {
            this.type = "position";
            this.x = 0;
            this.y = 0;
            this.isStatic = false;
            this.isDirty = false;
        }
    }
    exports.default = Position;
});
//# sourceMappingURL=Position.js.map