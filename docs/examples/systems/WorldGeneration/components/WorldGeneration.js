export default class WorldGeneration {
    constructor(){
        this.type = "world-generation";
        this.isGroundLoaded = false;
        this.arePropsLoaded = false;
        this.areEnemiesLoaded = false;

        this.groundEntities = [];
        this.propEntities = [];
        this.enemyEntities = [];

        this.position = {
            x: 0,
            y: 0
        };
    }
}