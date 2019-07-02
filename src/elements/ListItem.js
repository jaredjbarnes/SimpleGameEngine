import { html } from "../lit-html/lit-html.js";
import BaseElement from "./BaseElement.js";

const style = html`
    <style>
        :host {
            display: block;
            position:relative;
            height: 48px;
            border: 2px solid rgba(10, 177, 255, 1);   
            background-color: rgba(10, 177, 255, 0.15);
            color: rgba(10, 177, 255, 1);
            font-size: 10px;
            box-sizing: border-box;
            padding-left: 8px;
            cursor: pointer;
            user-select: none;   
            overflow: hidden;
        }

        .arrow {
            position:absolute;
            top:50%;
            right:8px;
            transform: translate(0, -50%);
        }

        .content {
            position:absolute;
            top:50%;
            left:8px;
            transform: translate(0, -50%);
        }

    </style>
`;

export default class ListItem extends BaseElement {
    constructor() {
        super();
    }

    render() {
        return html`
            ${style}
            <div class="content">
                <slot></slot>
            </div>
            <div class="arrow">&gt;</div>
        `;
    }
}

customElements.define("list-item", ListItem);