import Terrain from "./../../components/Terrain";
import Collidable from "./../../components/Collidable";
import Size from "./../../components/Size";
import Position from "./../../components/Position";
import Shape from "./../../components/Shape";
import Text from "./../../components/Text";
import Entity from "./../../Entity";
import Noise from "./Noise";

class TerrainEntity extends Entity {
    constructor() {
        super();

        const position = new Position();
        const size = new Size();
        const collidable = new Collidable();
        const terrain = new Terrain();
        const shape = new Shape();

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
        this.addComponent(terrain);
        this.addComponent(shape);
    }

    initialize({ x, y }, { terrainHeight, blockSize }) {
        const position = this.getComponent("position");
        const size = this.getComponent("size");
        const shape = this.getComponent("shape");
        const terrain = this.getComponent("terrain");

        position.x = x;
        position.y = y;
        position.isDirty = true;

        size.width = blockSize;
        size.height = blockSize;

        if (terrainHeight < 0.2) {

            let red = Math.floor(terrainHeight * 7 * 91);
            let green = Math.floor(terrainHeight * 7 * 132);
            let blue = Math.floor(terrainHeight * 7 * 198);

            red = red < 91 ? 91 : red;
            green = green < 132 ? 132 : green;
            blue = blue < 198 ? 198 : blue;

            shape.fillColor.red = red;
            shape.fillColor.green = green;
            shape.fillColor.blue = blue;
        } else if (terrainHeight >= 0.2 && terrainHeight < 0.25) {
            let red = Math.floor(terrainHeight * 4 * 246);
            let green = Math.floor(terrainHeight * 4 * 216);
            let blue = Math.floor(terrainHeight * 4 * 176);

            red = red > 246 ? 246 : red;
            green = green > 216 ? 216 : green;
            blue = blue > 176 ? 176 : blue;

            shape.fillColor.red = red;
            shape.fillColor.green = green;
            shape.fillColor.blue = blue;

        } else if (terrainHeight >= 0.25) {
            shape.fillColor.red = Math.floor(terrainHeight * 73);
            shape.fillColor.green = Math.floor(terrainHeight * 156);
            shape.fillColor.blue = Math.floor(terrainHeight * 74);

            let red = Math.floor(terrainHeight * 2 * 73);
            let green = Math.floor(terrainHeight * 2 * 156);
            let blue = Math.floor(terrainHeight * 2 * 74);

            red = red > 73 ? 73 : red;
            green = green > 156 ? 156 : green;
            blue = blue > 74 ? 74 : blue;

            shape.fillColor.red = red;
            shape.fillColor.green = green;
            shape.fillColor.blue = blue;
        }

        terrain.height = terrainHeight;

        // shape.fillColor.red = Math.floor(terrainHeight * 255);
        // shape.fillColor.green = Math.floor(terrainHeight * 255);
        // shape.fillColor.blue = Math.floor(terrainHeight * 255);
        //shape.isDirty = true;

        shape.points.push(
            { x: 0, y: 0 },
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: 0, y: blockSize },
            { x: 0, y: 0 },
        )

    }
}

export default class TerrainSystem {
    constructor({ blockSize = 30, seed = 0 }) {
        this.world = null;
        this.dynamicLoadingCells = [];
        this.terrainCells = [];
        this.availableTerrain = [];
        this.broadPhaseCollisitionData = null;
        this.noise = new Noise();
        this.blockSize = blockSize;
    }

    addTerrain(dynamicLoadingCell) {
        const size = dynamicLoadingCell.getComponent("size");
        const position = dynamicLoadingCell.getComponent("position");
        const width = size.width / this.blockSize;
        const height = size.height / this.blockSize;
        const offsetX = position.x / this.blockSize;
        const offsetY = position.y / this.blockSize;
        const index = this.dynamicLoadingCells.indexOf(dynamicLoadingCell);

        for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {

                let x = (offsetX + column);
                let y = (offsetY + row);

                const terrainHeight = Math.abs(this.noise.perlin(x / 30, y / 30));

                const entity = this.createTerrain(
                    {
                        x: x * this.blockSize,
                        y: y * this.blockSize
                    },
                    {
                        terrainHeight: terrainHeight,
                        blockSize: this.blockSize
                    }
                );


                if (!Array.isArray(this.terrainCells[index])) {
                    this.terrainCells[index] = [];
                }

                this.world.addEntity(entity);
                this.terrainCells[index].push(entity);
            }
        }
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        this.entityRemoved(entity);
    }

    createTerrain(newPosition, terrianData) {
        let entity;
        if (this.availableTerrain.length > 0) {
            entity = this.availableTerrain.pop();
        } else {
            entity = new TerrainEntity(newPosition, terrianData);
        }

        entity.initialize(newPosition, terrianData);
        return entity;
    }

    deactivated(world) {
        this.world = null;
        this.dynamicLoadingCells = [];
        this.broadPhaseCollisitionData = null;
    }

    entityAdded(entity) {
        if (this.isDynamicLoadingCellEntity(entity)) {
            const index = this.dynamicLoadingCells.indexOf(entity);

            if (index === -1) {
                this.dynamicLoadingCells.push(entity);
            }
        } else if (this.isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisitionData = entity.getComponent("broad-phase-collision-data");
        }
    }

    entityRemoved(entity) {
        if (this.isDynamicLoadingCellEntity(entity)) {
            const index = this.dynamicLoadingCells.indexOf(entity);

            if (index > -1) {
                this.dynamicLoadingCells.splice(index, 1);
            }
        } else if (this.isBroadPhaseCollisionDataEntity(entity)) {
            throw new Error("Terrain cannot be build without broadphaseCollisionData.");
        }
    }

    getEntitiesInCellPosition(cellPosition) {
        return this.broadPhaseCollisitionData.grid[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] || [];
    }

    getLastCellPositions(entity) {
        return entity.getComponent("collidable").lastCellPositions;
    }

    isCellDirty(entity) {
        return entity.getComponent("position").isDirty;
    }

    isBroadPhaseCollisionDataEntity(entity) {
        return entity.hasComponents(["broad-phase-collision-data"]);
    }

    isDynamicLoadingCellEntity(entity) {
        return entity.hasComponents(["dynamic-loading-cell", "size", "position", "collidable"]);
    }

    releaseTerrainEntity(entity) {
        this.world.removeEntity(entity);
        this.availableTerrain.push(entity);
    }

    removeTerrain(dynamicLoadingCell) {
        const index = this.dynamicLoadingCells.indexOf(dynamicLoadingCell);

        if (index > -1 && Array.isArray(this.terrainCells[index])) {
            this.terrainCells[index].forEach((entity) => {
                this.releaseTerrainEntity(entity)
            })
        }
    }

    update(currentTime) {
        if (this.broadPhaseCollisitionData != null) {
            for (let x = 0; x < this.dynamicLoadingCells.length; x++) {
                const dynamicLoadingCell = this.dynamicLoadingCells[x];

                if (this.isCellDirty(dynamicLoadingCell)) {
                    this.removeTerrain(dynamicLoadingCell);
                    this.addTerrain(dynamicLoadingCell);
                }

            }
        }
    }

}