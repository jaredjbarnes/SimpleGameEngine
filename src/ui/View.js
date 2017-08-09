import * as util from "./../util";
import Color from "./Color";
import Style from "./Style";
import Observable from "./Observable";

var createGuid = util.createGuid;
var invokeMethod = util.invokeMethod;

export default class View extends Observable {
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