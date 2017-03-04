define(["require", "exports"], function (require, exports) {
    "use strict";
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
    return State;
});
//# sourceMappingURL=State.js.map