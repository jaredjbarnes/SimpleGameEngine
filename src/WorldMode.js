import invokeMethod from "./utilities/invokeMethod.js";

export default class WorldMode {
    constructor() {
        this.name = null;
        this.isRunning = false;
        this.startTime = 0;
        this.timespans = [];

        this._world = null;
        this._systems = [];
    }

    activated(world) {
        this._world = world;
        this.notifySystems("activated", [world]);
    }

    deactivated(world) {
        this.stop();
        invokeMethod(system, "deactivated", [world]);
        this._world = null;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = performance.now();
        }
    }

    stop() {
        if (this.isRunning){
            this.isRunning = false;
            this.timespans.push(performance.now() - this.startTime);
        }
    }

    addSystem(system) {
        const systems = this._systems;
        const index = systems.indexOf(system);

        if (system.name == null) {
            throw new Error("Systems must have a name.");
        }

        if (index === -1) {
            systems.push(system);
            invokeMethod(system, "systemAdded", [system]);

            this._world.notify({
                type: "systemRemoved",
                mode: this.name,
                system
            });
        }
    }

    removeSystem(system) {
        const systems = this._systems;
        const index = systems.indexOf(system);

        if (index > -1) {

            systems.splice(index, 1);
            invokeMethod(system, "deactivated", [this._world]);
            invokeMethod(system, "systemRemoved", [system]);

            this._world.notify({
                type: "systemRemoved",
                mode: this.name,
                system
            });
        }
    }

    notifySystems(methodName, args) {
        const systems = this._systems;
        for (let x = 0; x < systems.length; x++) {
            const system = systems[x];
            invokeMethod(system, methodName, args);
        }
    }

    getTime() {
        let time = 0;

        for (let x = 0; x < this.timespans.length; x++) {
            time += this.timespans[x];
        }

        if (this.isRunning) {
            time += performance.now() - this.startTime;
        }

        return time;
    }
}