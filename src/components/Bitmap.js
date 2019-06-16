const schema = {
    "$id": "bitmap",
    "title": "Bitmap",
    "description": "Bitmap",
    "type": "object",
    "properties": {
        "identity": {
            "type": "string",
            "description": ""
        },
        "opacity": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        },
        "isDirty": {
            "type": "boolean"
        },
        "zIndex": {
            "type": "integer"
        }
    }
};

export default class Bitmap {
    constructor() {
        this.type = "bitmap";
        this.id = null;
        this.identity = null;
        this.opacity = 1;
        this.isDirty = true;
        this.zIndex = 0;
    }

    getSchema (){
        return schema;
    }
}