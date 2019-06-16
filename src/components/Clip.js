const schema = {
    "$id": "clip",
    "title": "Clip",
    "description": "Clip",
    "type": "object",
    "properties": {
        "url": {
            "type": "string"
        },
        "rule": {
            "type": "string"
        }
    }
};

export default class Clip {
    constructor() {
        this.type = "clip";
        this.url = null;
        this.rule = "nonzero";
    }

    getSchema() {
        return schema;
    }
}