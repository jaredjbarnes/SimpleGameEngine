import { html } from '../../lit-html/lit-html.js';
import BaseElement from "../BaseElement.js";

const style = html`
    <style>
        :host {
            display: inline-block;
            min-width: 100px;
        }

        .label {
            font-size: 10px;
            text-align: left;
            height: 18px;
            user-select:none;
        }

        input[type='text'] {
            border: 2px solid rgba(10, 177, 255, 1);   
            background-color: rgba(10, 177, 255, 0.15);
            color: rgba(10, 177, 255, 1);
            width: 100%;
            height: 30px;
            font-size: 16px;
        }    
    </style>
`;

export default class StringInput extends BaseElement {
    constructor() {
        super();

        this.label = null;
        this.schema = null;
    }
    render() {
        return html`
            ${style}
            <div class="label" >${this.getAttribute("label")}</div>
            <div class="input" >
                <input type="text" />
            </div>
        `;
    }
}

customElements.define('string-input', StringInput);
