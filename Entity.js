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
    class Entity {
        constructor() {
            this._delegate = null;
            this._components = new Map();
            this.id = createGuid();
        }
        _invokeMethod(obj, methodName, args) {
            args = Array.isArray(args) ? args : [];
            if (obj && typeof obj[methodName] === "function") {
                return obj[methodName].apply(obj, args);
            }
        }
        setDelegate(delegate) {
            this._delegate = delegate;
        }
        addComponent(component) {
            var type = component.type;
            var components = this._components;
            var delegate = this._delegate;
            if (typeof type !== "string") {
                throw new Error("Components need to have a type property.");
            }
            components.set(type, component);
            if (delegate != null) {
                this._invokeMethod(delegate, "componentAdded", [this, component]);
            }
        }
        removeComponent(component) {
            var type = component.type;
            var components = this._components;
            var delegate = this._delegate;
            if (typeof type !== "string") {
                throw new Error("Components need to have a type property.");
            }
            if (components.get(type) === component) {
                delete components.delete(component.type);
                if (delegate != null) {
                    this._invokeMethod(delegate, "componentRemoved", [this, component]);
                }
            }
        }
        getComponent(type) {
            return this._components.get(type) || null;
        }
        getComponents() {
            var keys = Array.from(this._components.keys());
            return keys.map((key) => {
                return this._components.get(key);
            });
        }
        hasComponents(componentTypes) {
            var components = this._components;
            return componentTypes.every(function (type) {
                return components.has(type);
            });
        }
    }
    return Entity;
});
//# sourceMappingURL=Entity.js.map