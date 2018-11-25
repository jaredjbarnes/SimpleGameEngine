class Pool {
    constructor({ type, factory }) {
        this.factory = factory;
        this.type = type;
        this.available = [];
        this.locked = {};
    }

    release(entity) {
        if (this.type != entity.type) {
            return;
        }

        if (this.locked[entity.id]) {
            delete this.locked[entity.id];
        }

        this.available.push(entity);
    }

    acquire() {
        let entity;

        if (this.available.length > 0) {
            entity = this.available.pop();
        } else {
            entity = this.factory();
        }
        
        this.locked[entity.id] = entity;
        return entity;
    }
}

export default class EntityPool {
    constructor() {
        this.pools = {};
    }

    addEntityType(type, factory) {
        this.pools[type] = new Pool({ factory, type });
    }

    removeEntityType(type) {
        delete this.pools[type];
    }

    acquire(type) {
        if (this.pools[type] == null) {
            throw new Error(`Cannot find entity pool of type '${type}'`);
        }

        return this.pools[type].acquire();
    }

    release(entity) {
        if (this.pools[entity.type] == null) {
            throw new Error(`Cannot find entity pool of type '${entity.type}'`);
        }

        return this.pools[entity.type].release(entity);
    }

    clear() {
        this.pools = {};
    }
}