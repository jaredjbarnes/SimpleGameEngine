import BaseElement from "../BaseElement";

export default class ObjectValue extends BaseElement {
    constructor(){
        super();

        this.label = null;
        this._schema = null;
    }

    get schema(){
        return this._schema;
    }

    set schema (value){
        if (value.type === "object"){
            this._schema = value;

            this.scheduleUpdate();
        }
    }

    render() {
        if (this._schema == null){
            return html``;
        } else {
            return html`
                
            `;
        }
    }
}