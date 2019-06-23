const schema = {
    "$id": "opacity",
    "title": "Opacity",
    "description": "Opacity",
    "type": "object",
    "properties": {
        "opacity": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        }
    }
};

export default class Opacity {
    constructor(){
        this.type = "opacity";
        this.value = 1;
    }
}