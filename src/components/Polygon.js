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
};

const arrayOfPositions = {
    "type": "array",
    "items": position
}

const readOnlyArrayOfPositions = {
    "type": "array",
    "items": position,
    "readOnly": true
}

const schema = {
    "$id": "opacity",
    "title": "Opacity",
    "description": "Opacity",
    "type": "object",
    "isSerializable": true,
    "properties": {
        "points": arrayOfPositions,
        "rotatedPoints": readOnlyArrayOfPositions,
        "vertices": readOnlyArrayOfPositions,
        "normals": readOnlyArrayOfPositions,
        "worldPoints": readOnlyArrayOfPositions,
        "projectedVertices": readOnlyArrayOfPositions,
        "center": position,
        "size": {
            "type": "Object",
            "properties": {
                "width": {
                    "type": "number"
                },
                "height": {
                    "type": "number"
                }
            }
        },
        "rotation": {
            "type": "number"
        },
        "isDirty": {
            "type": "boolean"
        }
    }
};

export default class Polygon {
    constructor() {
        this.type = "polygon";
        this.points = [];
        this.rotatedPoints = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
        this.center = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
        this.rotation = 0;
        this.isDirty = true;
    }

    getSchema() {
        return schema;
    }
}