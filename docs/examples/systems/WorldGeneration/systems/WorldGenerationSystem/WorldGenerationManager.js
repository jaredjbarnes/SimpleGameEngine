import GroundGenerationManager from "./GroundGenerationManager";

export default class WorldGenerationManager {
    constructor(config) {
        this.groundGenerationManager = new GroundGenerationManager(config);
    }

    manage() {
        this.groundGenerationManager.manage();
    }

}