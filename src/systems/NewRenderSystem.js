export class RenderSystem {
    constructor(){
        this.rasterizers = {};
    }

    _validateRasterizer(rasterizer){
        if (rasterizer.type == undefined){
            throw new Error("Rasterizers need to have a type property.");
        }

        if (typeof rasterizer.rasterize !== "function"){
            throw new Error("Rasterizers need to have a rasterize method.");
        }
    }

    addRasterizer(rasterizer){
        this._validateRasterizer(rasterizer);
    }
}