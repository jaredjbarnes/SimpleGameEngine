define(["require", "exports"], function (require, exports) {
    "use strict";
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
    return Observer;
});
//# sourceMappingURL=Observer.js.map