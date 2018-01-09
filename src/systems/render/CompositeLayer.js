import EntityCompositor from "./EntityCompositer";
import CompositeCanvas from "./CompositeCanvas";

class RenderableEntity {
    constructor() {
        this.id = null;
        this.size = null;
        this.position = null;
        this.collidable = null;
        this.images = [];
    }
}

export default class CompositeLayer {
    constructor({ document, size, imageManager, identity = null, sort = () => 0 }) {
        this.identity = identity;
        this.entities = [];
        this.dirtyEntities = [];
        this.entitiesById = {};
        this.size = size;
        this.imageManager = imageManager;
        this.imageTypes = Object.keys(this.imageManager.rasterizers);
        this.compositeImage = null;
        this.entityCompositer = new EntityCompositer({ document, imageManager });
        this.sort = (entityA, entityB) => {
            let value = 0;

            if (sort != null) {
                value = sort(entityA, entityB);
            }

            if (value === 0) {
                return entityA.id - entityB.id;
            }

            return value;
        };
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.entitiesById[entity.id] = entity;
    }

    createComposite() {
        this.compositeImage = new CompositeCanvas(size.width, size.height);
        this.compositeImage.clearRect(0, 0, size.width, size.height);

        const entities = this.entities;

        for (let x = 0; x < entities.length; x++) {
            const entity = entiites[x];
            const entityImage = this.entityCompositer.rasterize(entity);

            this.drawImage();
        }
    }

    updatedComposite(){

    }

    isDirty(_entity) {
        const entity = _entity;
        const size = entity.getComponent("size");
        const position = entity.getComponent("position");
        const imageTypes = this.imageTypes;
        const areImagesDirty = false;

        for (let x = 0; x < imageTypes.length; x++) {
            const image = entity.getComponent(imageTypes[x]);

            if (image && image.isDirty) {
                areImagesDirty = true;
                break;
            }
        }

        return size.isDirty || positions.isDirty || areImagesDirty;
    }

    findDirtyEntities() {
        const entities = this.entities;
        const dirtyEntities = [];

        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];
            const isDirty = this.isDirty(entity);

            if (isDirty) {
                dirtyEntities.push(entity);
            }
        }
        this.dirtyEntities = dirtyEntities;
    }

    getCollisions({ cells }) {
        return Object.keys(cells).reduce((accumulator, collisions) => {
            return accumulator.concat(collisions.filter((collision) => {
                return this.entitiesById[collision.entityId] != null;
            }));
        }, []).sort(this.sort);
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }

        this.entitiesById[entity.id] = null;
    }

    transferImage(destinationCanvas,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight
    ) {
        this.findDirtyEntities();

        if (this.dirtyEntities.length > 0) {

        }
    }
}