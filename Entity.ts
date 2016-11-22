
var S4 = function () {
    return Math.floor(
        Math.random() * 0x10000 /* 65536 */
    ).toString(16);
};

var createGuid = function () {
    return (
        S4() + S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + S4() + S4()
    );
}

class Entity {
    private _delegate: any;
    private _components: any;
    private id: string;

    constructor() {
        this._delegate = null;
        this._components = {};
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

        components[type] = component;

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

        if (components[type] === component) {
            delete components[component.type];

            if (delegate != null) {
                this._invokeMethod(delegate, "componentRemoved", [this, component]);
            }
        }

    }

    getComponent(type) {
        return this._components[type] || null;
    }

    hasComponents(componentTypes) {
        var components = this._components;
        return componentTypes.every(function (type) {
            return components[type] != null;
        })
    }
}


export = Entity;
