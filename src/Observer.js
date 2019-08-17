const states = {
    "ACTIVE": "ACTIVE",
    "DISPOSED": "DISPOSED",
    "STOPPED": "STOPPED"
};

export default class Observer {
    constructor(type, callback, unbind) {
        this.type = type;
        this.callback = callback;
        this.unbind = unbind;
        this.state = state.ACTIVE;
    }

    notify(event) {
        if (this.state !== states.ACTIVE || event.type !== this.type) {
            return;
        }

        this.callback(event);
    }

    dispose() {
        if (this.state != states.DISPOSED) {
            this.state = states.DISPOSED;

            this.unbind();
        }
    }

    stop() {
        if (this.state === states.ACTIVE) {
            this.state = states.STOPPED;
        }
    }

    start() {
        if (this.state === states.STOPPED) {
            this.state = states.ACTIVE;
        }
    }

}