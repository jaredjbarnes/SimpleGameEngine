import WorldGeneration from "../../components/WorldGeneration";
import WorldGenerationManager from "./WorldGenerationManager";

const DYNAMIC_LOADING_CELL = "dynamic-loading-cell";
const WORLD_GENERATION = "world-generation";

export default class WorldGenerationSystem {
    constructor({ noise, scale = 1000 }) {
        this.noise = noise;
        this.scale = scale;
        this.world = null;
        
        this.worldGenerationManager = new WorldGenerationManager({ noise, scale });
        this.dynamicLoadingCells = [];
    }

    addDynamicLoadingCell(entity) {
        const index = this.dynamicLoadingCells.indexOf(entity);
        if (index === -1) {
            this.dynamicLoadingCells.push(entity);

            entity.getComponent("transform").isDirty = true;

            if (!entity.hasComponent(WORLD_GENERATION)) {
                entity.addComponent(new WorldGeneration());
            }
        }
    }

    isDynamicLoadingCell(entity) {
        return entity.hasComponent(DYNAMIC_LOADING_CELL);
    }

    isDynamicLoadingCellComponent(component) {
        return component.type === DYNAMIC_LOADING_CELL;
    }

    removeDynamicLoadingCell(entity) {
        const index = this.dynamicLoadingCells.indexOf(entity);
        if (index > -1) {
            entity.removeComponentByType(WORLD_GENERATION);
            this.dynamicLoadingCells.splice(index, 1);
        }
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

    componentAdded(entity) {
        if (this.isDynamicLoadingCell(entity)) {
            this.addDynamicLoadingCell(entity);
        }
    }

    componentRemoved(entity, component) {
        if (this.isDynamicLoadingCellComponent(component)) {
            this.removeDynamicLoadingCell(entity);
        }
    }

    deactivated() {
        this.world = null;
        this.dynamicLoadingCells = null;
        this.entityPool.clear();
    }

    entityAdded(entity) {
        if (this.isDynamicLoadingCell(entity)) {
            this.addDynamicLoadingCell(entity);
        }
    }

    entityRemoved(entity) {
        this.removeDynamicLoadingCell(entity);
    }

    afterUpdate() {
        for (let x = 0; x < this.dynamicLoadingCells.length; x++) {
            const entity = this.dynamicLoadingCells[x];
            this.worldGenerationManager.manage(this.world, entity);
        }
    }

}