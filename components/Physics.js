define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Physics {
        constructor() {
            this.velocity = { x: 0, y: 0 };
            this.mass = 1;
            this.elasticity = 1;
            this.friction = { x: 0, y: 0 };
        }
    }
    exports.default = Physics;
});
//# sourceMappingURL=Physics.js.map