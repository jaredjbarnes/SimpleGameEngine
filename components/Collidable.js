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
    return Collidable;
});
//# sourceMappingURL=Collidable.js.map