import { html } from "../../lit-html/lit-html.js";
import { classMap } from "../../lit-html/directives/class-map.js";
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
            text-align: right;
            position:relative;
        }

        .bar-container {
            position:absolute;
            top:50%;
            right: 0;
            transform: translate(0, -50%);
            cursor: pointer;
        }

        .bar {
            position:relative;
            border: 2px solid rgba(10, 177, 255, 1);   
            background-color: rgba(10, 177, 255, 0.15);
            color: rgba(10, 177, 255, 1);
            width: 68px;
            height: 30px;
            font-size: 16px;
            box-sizing: border-box;
        }  

        .handle {
            position: absolute;
            left: 0;
            top: -2px;
            height: 34px;
            width: 34px;
            background-color: rgba(10, 177, 255, 0.95);
            transition: transform 200ms cubic-bezier(0.42, 0.0, 0.58, 1.0);
            user-select: none;
        }

        .fill {
            position:absolute;
            left:0;
            top:0;
            background-color: rgba(10, 177, 255, 0.50);
            width:50%;
            height:100%;
        }

        .on {
            transform: translate(100%,0);
        }

        .off {
            transform: translate(0,0);
        }
    </style>
`;

export default class BooleanInput extends BaseElement {
    constructor() {
        super();

        this.value = this.value;
        this.onClick = this.onClick.bind(this);
    }

    static get observedAttributes() {
        return ["value"];
    }

    get value() {
        return this.getAttribute("value") === "true" ? true : false;
    }

    set value(value) {
        if (typeof value === "boolean" && this.value !== value) {
            this.setAttribute("value", value.toString());
        }
    }

    onClick() {
        this.value = !this.value;
    }

    render() {
        const label = this.getAttribute("label");

        const handleClasses = {
            "handle": true,
            "on": this.value,
            "off": !this.value
        };

        return html`
            ${style}
            <div class="container">
                <div class="label">${label}</div>
                <div class="value">
                <div class="bar-container"  @click=${this.onClick}>
                        <div class="bar">
                            <div class="fill"></div>
                        </div>
                        <div class=${classMap(handleClasses)}></div>
                    </div>
                </div>
            </div>
        `;

    }
}

customElements.define("boolean-input", BooleanInput);