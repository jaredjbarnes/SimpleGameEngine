﻿export default class ImageTexture {
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