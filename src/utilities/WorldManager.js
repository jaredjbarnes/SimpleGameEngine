export default class WorldManager {
    constructor(world, fileSystem, componentManager) {
        this.world = world;
        this.fileSystem = fileSystem;
        this.componentManager = componentManager;
    }

    _replacer(key, value) {
        if (value instanceof Map) {
            return undefined;
        } else {
            return value;
        }
    }

    loadAsync(name) {
        var componentManager = this.componentManager;

        // Empty the world of serializable items.
        this.world.getEntitiesByFilter((entity) => {
            return entity.hasComponent("serializable");
        }).forEach((entity) => {
            this.world.removeEntity(entity);
        });

        return this.fileSystem.getFileAsync(name).then((json) => {
            var entities = JSON.parse(json);

            entities.forEach((entity) => {
                var defaultEntity = this.componentManager.createComponent(entity.type, entity)
                this.world.addEntity(defaultEntity);
            });
        });
    }

    saveAsync(name) {
        var entities = world.getEntitiesByFilter((entity) => {
            return entity.hasComponent("serializable");
        });

        return this.fileSystem.saveFileAsync(name, JSON.stringify(entities, this._replacer));
    }

}