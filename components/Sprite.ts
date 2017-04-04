import ImageTexture from "./ImageTexture";
export default class Sprite {
    type: string;
    index: number;
    timeScale: number;
    images: Array<ImageTexture>;

    constructor(){
        this.type = "sprite";
        this.index = 0;
        this.timeScale = 1;
        this.images = [];
    }
}