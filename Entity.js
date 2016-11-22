define(["require", "exports"], function (require, exports) {
    "use strict";
    var S4 = function () {
        return Math.floor(Math.random() * 0x10000 /* 65536 */).toString(16);
    };
    var createGuid = function () {
        return (S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4());
    };
    var Entity = (function () {
        function Entity() {
            this._delegate = null;
            this._components = {};
            this.id = createGuid();
        }
        Entity.prototype._invokeMethod = function (obj, methodName, args) {
            args = Array.isArray(args) ? args : [];
            if (obj && typeof obj[methodName] === "function") {
                return obj[methodName].apply(obj, args);
            }
        };
        Entity.prototype.setDelegate = function (delegate) {
            this._delegate = delegate;
        };
        Entity.prototype.addComponent = function (component) {
            var type = component.type;
            var components = this._components;
            var delegate = this._delegate;
            if (typeof type !== "string") {
                throw new Error("Components need to have a type property.");
            }
            components[type] = component;
            if (delegate != null) {
                this._invokeMethod(delegate, "componentAdded", [this, component]);
            }
        };
        Entity.prototype.removeComponent = function (component) {
            var type = component.type;
            var components = this._components;
            var delegate = this._delegate;
            if (typeof type !== "string") {
                throw new Error("Components need to have a type property.");
            }
            if (components[type] === component) {
                delete components[component.type];
                if (delegate != null) {
                    this._invokeMethod(delegate, "componentRemoved", [this, component]);
                }
            }
        };
        Entity.prototype.getComponent = function (type) {
            return this._components[type] || null;
        };
        Entity.prototype.hasComponents = function (componentTypes) {
            var components = this._components;
            return componentTypes.every(function (type) {
                return components[type] != null;
            });
        };
        return Entity;
    }());
    return Entity;
});
//# sourceMappingURL=Entity.js.map