class ImageTexture {
    type: string;
    path: string;
    position: { x: number; y: number; };
    size: { width: number; height: number; };
    padding: { top: number; right: number; bottom: number; left: number; }
    isDirty: boolean;

    constructor() {
        this.type = "image-texture";
        this.path = null;
        this.position = {
            x: 0,
            y: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        this.padding = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.isDirty = true;
    }
}

export = ImageTexture;