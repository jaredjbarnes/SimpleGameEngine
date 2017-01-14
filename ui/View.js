define(["require", "exports", "util", "Color"], function (require, exports, util, Color) {
    "use strict";
    var createGuid = util.createGuid;
    var invokeMethod = util.invokeMethod;
    class Style {
        constructor() {
            this.border.color = new Color();
            this.border.thickness = 0;
            this.backgroundColor = new Color();
            this.size.width = 0;
            this.size.height = 0;
            this.position.x = 0;
            this.position.y = 0;
            this.isFixed = false;
        }
    }
    class Observer {
        constructor(callback, disposer) {
            this.isDisposed = false;
            this.isStopped = false;
            this.callback = callback;
            this.disposer = disposer;
        }
        dispose() {
            this.isDisposed = true;
            this.disposer();
        }
        notify(event) {
            if (!this.isDisposed && !this.isStopped) {
                this.callback(event);
            }
        }
        start() {
            this.isStopped = false;
        }
        stop() {
            this.isStopped = false;
        }
    }
    class View {
        constructor() {
            this.id = createGuid();
            this.observers = new Map();
            var style = new Style();
            Object.defineProperties(this, {
                style: {
                    get: function () {
                        return style;
                    }
                }
            });
        }
        observe(name, callback) {
            var observers = this.observers.get(name);
            if (observers == null) {
                observers = new Map();
                this.observers.set(name, observers);
            }
            var observer = new Observer(callback, () => {
                observers.delete(observer);
            });
            return observer;
        }
        notify(event) {
            var name = event.name;
            var observers = this.observers.get(name);
            var behaviors = this.behaviors;
            if (observers == null) {
                return;
            }
            behaviors.forEach((behavior) => {
                invokeMethod(behavior, name, [event]);
            });
            observers.forEach((observer) => {
                observer.notify(event);
            });
        }
    }
    return View;
});
//# sourceMappingURL=View.js.map