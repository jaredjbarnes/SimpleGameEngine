const schema = {
    "$id": "history-player",
    "title": "History Player",
    "description": "History Player",
    "type": "object",
    "properties": {
        "history": {
            "type": "array",
            "items": {
                "type": "object"
            }
        },
        "offset": {
            "type": "integer"
        }
    }
};

export default class HistoryPlayer {
    constructor() {
        this.type = "history-player";
        this.history = [];
        this.offset = 0;
    }

    getSchema() {
        return schema;
    }
}