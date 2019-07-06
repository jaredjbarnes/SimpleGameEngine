import BaseElement from "./BaseElement.js";
import { html } from "../src/lit-html/lit-html.js";

const style = html`
    <style>
    :host {
        display: block;
    }

    .label {
        padding-top: 20px;
        padding-bottom: 4px;
        padding-left: 6px;
        text-transform: uppercase;
        background-color: #dbddde;
    }
   
    .value {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;

        width: 100%;
        background-color: #f1f1f1;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    </style>
`;

export default class UIProperty extends BaseElement {
    render() {
        return html`
            ${style}
            <div class="label">
                ${this.getAttribute("label")}
            </div>
            <div class="value">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define("ui-property", UIProperty);