define(["require", "exports"], function (require, exports) {
    "use strict";
    class Collidable {
        constructor() {
            this.type = "collidable";
            this.name = null;
            this.isEnabled = true;
            this.isStatic = false;
            this.isInitialized = false;
            this.activeCollisions = {};
        }
    }
    return Collidable;
});
//# sourceMappingURL=Collidable.js.map