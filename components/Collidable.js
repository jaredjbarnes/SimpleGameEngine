define(["require", "exports"], function (require, exports) {
    "use strict";
    var Collidable = (function () {
        function Collidable() {
            this.type = "collidable";
            this.name = null;
            this.isEnabled = true;
            this.isStatic = false;
            this.isInitialized = false;
            this.activeCollisions = {};
        }
        return Collidable;
    }());
    return Collidable;
});
//# sourceMappingURL=Collidable.js.map