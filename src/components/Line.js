const colorChannel = {
    "type": "integer",
    "minimum": 0,
    "maximum": 255
};

const position = {
    "type": "object",
    "properties": {
        "x": {
            "type": "number"
        },
        "y": {
            "type": "number"
        }
    }
}

const schema = {
    "$id": "line",
    "title": "Line",
    "description": "Line",
    "type": "object",
    "isSerializable": true,
    "properties": {
        "thickness": {
            "type": "number"
        },
        "color": {
            "type": "object",
            "properties": {
                "red": colorChannel,
                "green": colorChannel,
                "blue": colorChannel
            }
        },
        "to": position,
        "from": position,
        "zIndex": {
            "type": "integer"
        },
        "opacity": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        },
        "isDirty": {
            "type": "boolean"
        }
    }
};

export default class Line {
    constructor() {
        this.type = "line";
        this.thickness = 1;
        this.color = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
        };
        this.to = {
            x: 0,
            y: 0
        }
        this.from = {
            x: 0,
            y: 0
        }
        this.zIndex = 0;
        this.opacity = 1;
        this.isDirty = false;
    }

    getSchema(){
        return schema;
    }
}