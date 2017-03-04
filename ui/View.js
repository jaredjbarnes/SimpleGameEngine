define(["require", "exports", "./../util", "./Style", "./Observable"], function (require, exports, util, Style, Observable) {
    "use strict";
    var createGuid = util.createGuid;
    var invokeMethod = util.invokeMethod;
    class View extends Observable {
        constructor() {
            super();
            this.id = createGuid();
            var style = new Style();
            Object.defineProperties(this, {
                style: {
                    get: function () {
                        return style;
                    }
                }
            });
        }
    }
    return View;
});
//# sourceMappingURL=View.js.map