define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = Observer;
});
//# sourceMappingURL=Observer.js.map