define(["require", "exports"], function (require, exports) {
    "use strict";
    var ImageTexture = (function () {
        function ImageTexture() {
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
        }
        return ImageTexture;
    }());
    return ImageTexture;
});
//# sourceMappingURL=ImageTexture.js.map