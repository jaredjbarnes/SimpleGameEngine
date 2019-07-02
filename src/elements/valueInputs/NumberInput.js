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

        input[type='number'] {
            border: 2px solid rgba(10, 177, 255, 1);   
            background-color: rgba(10, 177, 255, 0.15);
            color: rgba(10, 177, 255, 1);
            width: 100%;
            height: 30px;
            font-size: 16px;
            -moz-appearance: textfield;
        }    

        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            margin: 0; /* Removes leftover margin */
        }
    </style>
`;

export default class NumberInput extends BaseElement {
    constructor() {
        super();

        this.label = null;
        this.onChange = this.onChange.bind(this);
    }

    get value() {
        return new Number(this.getAttribute("value")).valueOf();
    }

    set value(value) {
        value = new Number(value).valueOf();

        if (!Number.isNaN(value)){
            this.setAttribute("value", value);
            this.shadowRoot.querySelector("input").value = value;
        }
    }

    onChange(event){
        this.value = event.target.value;
    }

    render() {
        return html`
            ${style}
            <div class="label" >${this.getAttribute("label")}</div>
            <div class="input" >
                <input type="number" @change=${this.onChange} />
            </div>
        `;
    }
}

customElements.define('number-input', NumberInput);
