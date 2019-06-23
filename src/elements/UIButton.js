import { html } from '../lit-html/lit-html.js';
import { classMap } from "../lit-html/directives/class-map.js"
import BaseElement from "./BaseElement.js";

const style = html`
<style>

    :host{
        display: inline-block;
    }

    .container {
        user-select:none;
        padding: 0px 7px;
        font-size: 10px;
        box-sizing: border-box;
        background-color:rgba(10, 177, 255, 0.25);
        display: inline-block;
        line-height: 26px;
        height: 30px;
        border: 2px solid #0AB1FF;
        cursor: pointer;
    }

    .container-left {
        border-radius: 0 15px;
    }

    .container:hover {
        background-color:rgba(10, 177, 255, 0.45);
    }

    .container:active {
        background-color:rgba(10, 177, 255, 0.65);
    }

    .container-right {
        border-radius: 15px 0;
    }

    .container-center {
        border-radius: 0px 0px 15px 15px;
    }
    
</style>
`;


export default class UIButton extends BaseElement {
    constructor() {
        super();
    }

    render() {
        const mode = this.getAttribute("mode");
        const classes = {
            "container-left": mode === "left" || mode == null,
            "container-right": mode === "right",
            "container-center": mode === "center",
            "container": true
        };

        return html`
                ${style}
                <span class=${classMap(classes)}><slot></slot></span>
            `;
    }
}

customElements.define('ui-button', UIButton);