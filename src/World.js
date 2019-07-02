import EntityDelegate from "./EntityDelegate.js";
import WorldModeValidator from "./WorldModeValidator.js";

export default class World {
    constructor() {

        this._entityDelegate = new EntityDelegate(this);
        this._animationFrame = null;
        this._systems = [];
        this._entities = [];
        this._entitiesById = {};
        this._loop = this._loop.bind(this);
        this._modes = [];
        this._mode = null;

    }

    addMode(mode) {
        if (this.isValidMode(mode)) {
            this._modes.push(mode);
            mode.activated(this);
        }
    }

    isValidMode(mode) {
        return WorldModeValidator.validate(mode);
    }

    getMode(name){
        return this._modes.find((mode)=>{
            return mode.name === name;
        });
    }

    setMode(name){
        const mode = this.getMode(name);
        const currentMode = this._mode;

        if (mode != null){
            if (currentMode != null){
                currentMode.stop();
            }

            this._mode = mode;

            if (currentMode != null && currentMode.isRunning){
                mode.start();
            }

        }
    }

    removeMode(mode){
        const index = this._modes.indexOf(mode);
        
        if (index > -1){

            if (mode === this._mode){
                this._mode = null;
            }

            mode.deactivated(this);
            this._modes.splice(index, 1);
        }
    }

    getModes(){
        return this._modes.slice();
    }

    _loop() {
        this.update();
        this._animationFrame = requestAnimationFrame(this._loop);
    }

    update() {
        if (this._mode == null){
            return;
        }

        const time = this._mode.getTime();

        this.notifyModeSystems("beforeUpdate", [time]);
        this.notifyModeSystems("update", [time]);
        this.notifyModeSystems("afterUpdate", [time]);
    }

    notifyModeSystems(methodName, args) {
        if (this._mode != null){
            this._mode.notifySystems(methodName, args);
        }
    }

    notifySystems(methodName, args){
        this._modes.forEach((mode)=>{
            mode.notifySystems(methodName, args);
        })
    }

    addEntity(entity) {
        const registeredEntity = this._entitiesById[entity.id];

        if (registeredEntity == null) {
            this._entitiesById[entity.id] = entity;
            this._entities.push(entity);

            entity.setDelegate(this._entityDelegate);
            this.notifySystems("entityAdded", [entity]);
        }

    }

    removeEntity(entity) {
        const registeredEntity = this._entitiesById[entity.id];

        if (registeredEntity != null) {
            delete this._entitiesById[entity.id];
            const index = this._entities.indexOf(entity);
            this._entities.splice(index, 1);

            entity.setDelegate(null);
            this.notifySystems("entityRemoved", [entity]);
        }
    }

    start() {
        if (this._mode == null){
            throw new Error("The world needs to have a mode before running.");
        }
        
        if (!this._mode.isRunning){
            this._mode.start();
            this.notifySystems("started");
            this._loop();
        }
    }

    stop() {
        if (this._mode.isRunning) {
            this._mode.stop();

            cancelAnimationFrame(this._animationFrame);
            this.notifySystems("stopped");
        }
    }

    getEntities() {
        return this._entities.slice();
    }

    getEntitiesByFilter(filter) {
        return this._entities.filter(filter);
    }

    getEntityById(id) {
        var _id = id;
        return this._entitiesById[_id] || null;
    }

}