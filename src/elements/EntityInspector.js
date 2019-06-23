import { html } from '../lit-html/lit-html.js';
import BaseElement from "./BaseElement";

export default class EntityInspector extends BaseElement {
    constructor() {
        super();
        this.entity = null;
    }

    get entity() {
        return this.entity;
    }

    set entity(value) {
        this.entity = value;
        this.scheduleUpdate();
    }

    render() {
        if (this.entity == null) {
            return html``;
        } else {
            
        }
    }
}