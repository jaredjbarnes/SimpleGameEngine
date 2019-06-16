const DEPENDENCIES = ["spin", "transform"];

export default class SpinningSystem {
    constructor() {
        this.world = null;
        this.name = "spinning";
        this.entities = {};
    }

    isSpinnable(entity) {
        return entity.hasComponents(DEPENDENCIES);
    }

    activated(world) {
        this.world = world;

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
        this.entities = {};
    }

    componentAdded(entity) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.includes(component.type)) {
            delete this.entities[entity.id];
        }
    }

    entityAdded(entity) {
        if (this.isSpinnable(entity)) {
            this.entities[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.entities[entity.id]) {
            delete this.entities[entity.is];
        }
    }

    update() {
        for (let key in this.entities) {
            const entity = this.entities[key];

            const spin = entity.getComponent("spin");
            const transform = entity.getComponent("transform");

            transform.rotation += spin.step;
            if (transform.rotation > 360) {
                transform.rotation = 1;
            }
            transform.isDirty = true;
        }
    }
}