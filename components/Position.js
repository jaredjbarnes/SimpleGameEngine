define(["require", "exports"], function (require, exports) {
    "use strict";
    class Position {
        constructor() {
            this.type = "position";
            this.x = 0;
            this.y = 0;
            this.isStatic = false;
            this.isDirty = false;
        }
    }
    return Position;
});
//# sourceMappingURL=Position.js.map