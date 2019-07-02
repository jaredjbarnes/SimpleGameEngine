const schema = {
    "$id": "image",
    "title": "Image",
    "description": "Image",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "isReadOnly": true
        },
        "url": {
            "type": "string",
            "isReadOnly": true
        },
        "position": {
            "type": "object",
            "properties": {
                "x": {
                    "type": "number"
                },
                "y": {
                    "type": "number"
                }
            },
            "isReadOnly": true
        },
        "size": {
            "type": "object",
            "properties": {
                "width": {
                    "type": "number"
                },
                "height": {
                    "type": "number"
                }
            },
            "isReadOnly": true
        },
        "padding": {
            "type": "object",
            "properties": {
                "top": {
                    "type": "number"
                },
                "right": {
                    "type": "number"
                },
                "bottom": {
                    "type": "number"
                },
                "left": {
                    "type": "number"
                }
            },
            "isReadOnly": true
        },
        "opacity": {
            "type": "number",
            "minimum": 0,
            "maximum": 1,
            "isReadOnly": true
        },
        "flipHorizontally": {
            "type": "boolean",
            "isReadOnly": true
        },
        "flipVertically": {
            "type": "boolean",
            "isReadOnly": true
        }
    }
};


export default class Image {
    constructor() {
        this.type = "image";
        this.id = null;
        this.url = null;
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
        this.opacity = 1;
        this.flipHorizontally = false;
        this.flipVertically = false;
    }
}