export class TextureLoader {
    constructor(gl) {
        this.textures = {};
        this.gl = gl;
    }

     loadTextureAsync(url) {
        if (this.textures[url] != null){
            return this.textures[url].promise;
        }

        const textureInfo = {
            url,
            width: 0,
            height: 0,
            texture: this.gl.createTexture(),
            promise: null
        };

        const promise = new Promise((resolve, reject) => {
            const image = new Image();

            this.gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);

            image.addEventListener("load", () => {
                textureInfo.width = image.width;
                textureInfo.height = image.height;

                resolve(textureInfo);
            });

            image.addEventListener("error", () => {
                reject(new Error(`Couldn't load texture: "${url}".`));
            });

            image.src = url;
        });

        textureInfo.promise = promise;

        this.textures[url] = textureInfo;

        return promise;
    }

}