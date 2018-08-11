export default class Sprite {
    constructor(){
        this.type = "sprite";
        this.name = null;
        this.index = 0;
        this.timeScale = 1;
        this.images = [];
        this.isDirty = false;
    }
}