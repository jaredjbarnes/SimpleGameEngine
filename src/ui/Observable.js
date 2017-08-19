import Observer from "./Observer";

export default class Observable {
    constructor() {
        this.observers = new Map();
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

        if (observers == null) {
            return;
        }

        observers.forEach((observer) => {
            observer.notify(event);
        });

    }

}