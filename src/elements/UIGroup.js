import { html } from "../lit-html/lit-html.js";
import BaseElement from "./BaseElement.js";

const style = html`
    <style>
        :host {
            display: block;
        }

        .label {
            font-size: 10px;
            text-align: left;
            height: 18px;
            user-select:none;
        }
    </style>
`;

export default class UIGroup extends BaseElement {
    render() {
        return html`
            ${style}
           <div class="label">${this.getAttribute("label")}</div>
           <div class="list">
                <slot></slot>
           </div>
        `;
    }
}

customElements.define("ui-group", UIGroup);