import Observer from "./Observer.js";

export default class Observable {
    constructor() {
        this._observers = [];
    }

    observe(type, callback) {
        const observer = new Observer(type, callback, () => {
            const index = this._observers.indexOf(observer);

            if (index > -1) {
                this._observers.splice(index, 1);
            }
        });

        return observer;
    }

    notify(event) {
        this._observers.forEach((observer) => {
            observer.notify(event);
        });
    }
}