export default class Bitmap {
    constructor(){
        this.type = "bitmap";
        this.id = null;
        this.identity = null;
        this.opacity = 1;
        this.isDirty = true;
        this.zIndex = 0;
    }
}