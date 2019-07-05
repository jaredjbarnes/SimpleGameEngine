import { html } from "../src/lit-html/lit-html.js";
import { classMap } from "../src/lit-html/directives/class-map.js";
import BaseElement from "./BaseElement.js";

const style = html`
    <style>
        :host {
            display: inline-block;
        }

        .value {
            grid-column-start: 2;
            grid-column-end: 2;
            text-align: right;
            position:relative;
        }

        .bar-container {
            position: relative;
            cursor: pointer;
        }

        .bar {
            position:relative;
            border: 1px solid #ccc;   
            background-color: #eff0f1;
            color: rgba(10, 177, 255, 1);
            width: 60px;
            height: 30px;
            box-sizing: border-box;
            border-radius: 15px;
            overflow: hidden;
        }  


        .handle {
            position: absolute;
            top: 0;
            left:0;
            height: 30px;
            width: 30px;
            background-color: #fff;
            transform: translate(-50%, 0);
            user-select: none;
            border-radius: 50% 50%;
            box-sizing: border-box;
            border: 1px solid #ccc;
            box-shadow: 0 2px 3px rgba(0,0,0,0.25);
            transition: transform 200ms cubic-bezier(0.42, 0.0, 0.58, 1.0);
        }

        .fill {
            position:absolute;
            left:0;
            top:0;
            background-color: rgb(0, 0, 0, 0);
            transition: background-color 200ms cubic-bezier(0.42, 0.0, 0.58, 1.0);
            width:100%;
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
            <div class="bar-container"  @click=${this.onClick}>
                <div class="bar">
                    <div class="fill" style="background-color:${this.value ? "#6d84a3" : "rgba(0,0,0,0)"}"></div>
                </div>
                <div class=${classMap(handleClasses)}></div>
            </div>
        `;

    }
}

customElements.define("boolean-input", BooleanInput);