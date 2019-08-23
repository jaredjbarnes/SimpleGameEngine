export class Texture {
    constructor(gl, url) {
        this.gl = gl;
        this.url = url;
        this.width = 0;
        this.height = 0; 
        this.promise = null;
        this.glTexture = gl.createTexture();

        this.gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    }

    static loadTextureAsync(url){
        const texture = new Texture(url);
        texture.loadAsync();

        return texture;
    }

    loadAsync(){
        if (this.promise != null){
            return this.promise;
        }

        return new Promise((resolve, reject)=>{
            
        });
    }
}