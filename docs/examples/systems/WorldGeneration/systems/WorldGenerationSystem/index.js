import WorldGenerationManager from "./WorldGenerationManager";

export default class WorldGenerationSystem {
    constructor({ noise, scale = 5, cameraName, buffer = 128 }) {
        this.noise = noise;
        this.scale = scale;
        this.cameraName = cameraName;
        this.buffer = buffer;
        this.world = null;
        this.camera = null;
        this.worldGenerationManager = null;
    }

    // Life-cycle Methods
    activated(world) {
        this.world = world;

        const entities = this.world.getEntities();
        for (let x = 0; x < entities.length; x++) {
            this.entityAdded(entities[x]);
        }

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }
    }

    setup() {
        if (this.worldGenerationManager != null) {
            return;
        }

        this.worldGenerationManager = new WorldGenerationManager({
            world: this.world,
            noise: this.noise,
            scale: this.scale,
            entity: this.camera,
            buffer: this.buffer
        });

    }

    setCamera(entity) {
        this.camera = entity;
        this.setup();
    }

    teardown() {
        this.camera = null;
        this.worldGenerationManager = null;
    }

    isCamera(entity) {
        const cameraComponent = entity.getComponent("camera");

        return cameraComponent != null && cameraComponent.name === this.cameraName;
    }

    componentAdded(entity) {
        if (this.isCamera(entity)) {
            this.setCamera(entity);
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "camera" && component.name === this.cameraName) {
            this.teardown();
        }
    }

    deactivated() {
        this.world = null;
        this.entityPool.clear();
    }

    entityAdded(entity) {
        if (this.isCamera(entity)) {
            this.setCamera(entity);
        }
    }

    entityRemoved(entity) {
        if (this.isCamera(entity)) {
            this.teardown();
        }
    }

    update() {
        if (this.worldGenerationManager != null) {
            this.worldGenerationManager.manage();
        }
    }

}