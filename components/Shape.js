define(["require", "exports"], function (require, exports) {
    "use strict";
    var Shape = (function () {
        function Shape() {
            this.type = "shape";
            this.fillColor = {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 0
            };
            this.border = {
                thickness: 0,
                color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 0
                }
            };
            this.points = [];
        }
        return Shape;
    }());
    return Shape;
});
//# sourceMappingURL=Shape.js.map