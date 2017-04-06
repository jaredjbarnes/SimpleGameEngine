define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var S4 = function () {
        return Math.floor(Math.random() * 0x10000 /* 65536 */).toString(16);
    };
    function createGuid() {
        return (S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4());
    }
    exports.createGuid = createGuid;
    ;
    function invokeMethod(obj, methodName, args) {
        args = Array.isArray(args) ? args : [];
        if (obj != null && typeof obj[methodName] === "function") {
            return obj[methodName].apply(obj, args);
        }
    }
    exports.invokeMethod = invokeMethod;
});
//# sourceMappingURL=util.js.map