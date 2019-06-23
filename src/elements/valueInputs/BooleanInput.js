import { html } from "../../lit-html/lit-html.js";
import BaseElement from "../BaseElement.js";

const style = html`
    <style>
        :host {
            display: inline-block;
            height: 48px;
        }

        .container {
            display: grid;
            grid-template-columns:50% 50%;
            width: 100%;
            height:100%;
            line-height: 48px;
        }

        .label {
            grid-column-start: 1;
            grid-column-end: 1;
            height: 100%;
            font-size:10px;
        }

        .value {
            grid-column-start: 2;
            grid-column-end: 2;
        }
    </style>
`;

export default class BooleanInput extends BaseElement {
    constructor() {
        super();
    }

    render() {
        const label = this.getAttribute("label");

        return html`
            ${style}
            <div class="container">
                <div class="label">${label}</div>
                <div class="value"></div>
            </div>
        `;

    }
}

customElements.define("boolean-input", BooleanInput);