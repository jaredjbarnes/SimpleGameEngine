import util = require("./../util");
import Color = require("./Color");
import Style = require("./Style");
import Observable = require("./Observable");

var createGuid = util.createGuid;
var invokeMethod = util.invokeMethod;

class View extends Observable {
    id: string;
    isDirty: boolean;
    style: Style;
    children: Array<View>;
    behaviors: Array<any>;

    constructor() {
        super();
        this.id = createGuid();

        var style = new Style();

        Object.defineProperties(this, {
            style: {
                get: function () {
                    return style;
                }
            }
        });
    }
   
}

export = View;