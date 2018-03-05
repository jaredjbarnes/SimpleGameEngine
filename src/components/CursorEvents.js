export default class CursorEvents {
    constructor(){
        this.type = "cursor-events";
        this.events = {
            mouseUp: null,
            mouseDown: null,
            mouseOver: null,
            click: null
        };
    }
}