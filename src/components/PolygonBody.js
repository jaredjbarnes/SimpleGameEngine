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
        "polygons": {
            "type": "array",
            "items": {
                "type": "object",
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
            }
        }

    }
};

export default class PolygonBody {
    constructor() {
        this.type = "polygon-body";
        this.polygons = [];
    }

    getSchema() {
        return schema;
    }
}