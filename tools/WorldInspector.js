import BaseElement from "./BaseElement.js";
import { html } from "../src/lit-html/lit-html.js";

const style = html`
    <style>
    
    </style>
`;

export default class WorldInspector extends BaseElement {
    constructor() {
        super();
    }

    render() {
        
    }
}

customElements.define("world-inspector", WorldInspector);