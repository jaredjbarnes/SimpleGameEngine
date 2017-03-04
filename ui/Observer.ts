class Observer {
    isDisposed: boolean;
    isStopped: boolean;
    disposer: () => void;
    callback: (event: any) => void;

    constructor(callback: (event) => void, disposer: () => void) {
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

export = Observer;