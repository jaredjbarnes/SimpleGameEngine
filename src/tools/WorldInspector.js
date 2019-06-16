import { html } from 'https://unpkg.com/lit-html?module';
import BaseElement from "./BaseElement";

export default class WorldInspector extends BaseElement {
    constructor() {
        super();
        this.world = null;
    }

    get world() {
        return this.world;
    }

    set world(value) {
        this.world = value;
    }

    render() {
        if (this.world == null) {
            html`No World`;
        } else {
            
        }
    }
}