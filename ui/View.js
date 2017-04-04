define(["require", "exports", "./../util", "./Style", "./Observable"], function (require, exports, util, Style_1, Observable_1) {
    "use strict";
    var createGuid = util.createGuid;
    var invokeMethod = util.invokeMethod;
    class View extends Observable_1.default {
        constructor() {
            super();
            this.id = createGuid();
            var style = new Style_1.default();
            Object.defineProperties(this, {
                style: {
                    get: function () {
                        return style;
                    }
                }
            });
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = View;
});
//# sourceMappingURL=View.js.map