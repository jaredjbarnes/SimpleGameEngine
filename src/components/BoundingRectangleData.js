export default class BoundingRectangleData {
    constructor(){
        this.type = "bounding-rectangle-data";
        this.isSerializable = false;
        this.entitiesById = {};
        this.dirtyEntities = [];
        this.entities = [];
    }
}