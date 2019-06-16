const schema = {
    "$id": "camera",
    "title": "Camera",
    "description": "Camera",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "isDirty": {
            "type": "boolean"
        }
    }
};

export default class Camera {
    constructor() {
        this.type = "camera";
        this.name = null;
        this.isDirty = false;
    }

    getSchema(){
        return schema;
    }
}
