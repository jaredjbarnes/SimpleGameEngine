define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class State {
        constructor() {
            this.type = "state";
            this.activeName = null;
            this.name = null;
            this.stateManagerName = null;
            this.options = {};
            this.activeOptions = {};
        }
    }
    exports.default = State;
});
//# sourceMappingURL=State.js.map