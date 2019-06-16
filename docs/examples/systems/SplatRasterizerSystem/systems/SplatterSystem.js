import Hit from "../Hit.js";

export default class SplatterSystem {
    constructor() {
        this.cursorEntity = null;
        this.cursorComponent = null;
        this.cursorRectangleCollider = null;
        this.cursorRectangle = null;
    }

    entityAdded(entity) {
        if (entity.hasComponent("cursor")) {
            this.cursorEntity = entity;
            this.cursorComponent = entity.getComponent("cursor");
            this.cursorRectangleCollider = entity.getComponent("rectangle-collider");
            this.cursorRectangle = entity.getComponent("rectangle");
        }
    }

    entityRemove(entity) {
        if (entity === this.cursorEntity) {
            this.cursorEntity = null;
            this.cursorComponent = null;
            this.cursorRectangleCollider = null;
        }
    }

    componentAdded(entity, component) {
        if (component.type === "cursor") {
            this.cursorEntity = entity;
            this.cursorComponent = component;
            this.cursorRectangleCollider = entity.getComponent("rectangle-collider");
            this.cursorRectangle = entity.getComponent("rectangle");
        }
    }

    componentRemove(entity, component) {
        if (component.type === "cursor") {
            this.cursorComponent = null;
            this.cursorEntity = null;
        }
    }

    isSplatable(entity) {
        return entity.hasComponents(["splat-surface"]);
    }

    handleHit(id) {
        if (this.cursorComponent.isLeftButtonDown) {
            const entity = this.world.getEntityById(id);

            if (entity != null) {
                const rectangle = entity.getComponent("rectangle");
                const splatSurface = entity.getComponent("splat-surface");
                const hits = splatSurface.hits;

                const x = this.cursorRectangle.left - rectangle.left;
                const y = this.cursorRectangle.top - rectangle.top;

                const index = hits.findIndex((hit) => {
                    return hit.x === x && hit.y === y;
                });

                if (index === -1) {
                    const hit = new Hit();
                    hit.x = x;
                    hit.y = y;
                    hit.size = 20;
                    hit.color.red = 255;
                    hit.color.green = 255;

                    splatSurface.hits.push(hit);
                    splatSurface.isDirty = true;
                }

            }
        }
    }
    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update() {
        if (this.cursorRectangleCollider != null) {
            const ids = Object.keys(this.cursorRectangleCollider.collisions);

            for (let x = 0; x < ids.length; x++) {
                const id = ids[x];
                this.handleHit(id);
            }
        }
    }
}