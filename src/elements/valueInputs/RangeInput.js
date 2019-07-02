import { html } from "../../lit-html/lit-html.js";
import BaseElement from "../BaseElement.js"

const style = html`
    <style>
        :host{
            display: inline-block;
            min-width: 100px;
            user-select: none;
        }

        .container{
            position:relative;
            width: 100%;
        }

        .data {
            display: grid;
            grid-template-columns: 50% 50%;
            font-size: 10px;
            text-align: left;
            height: 20px;
        }

        .label {
            grid-column-start: 1;
            grid-column-end: 1;
            text-align: left;
        }

        .value {
            grid-column-start: 2;
            grid-column-end: 2;
            text-align: right;
            font-size:10px;
            font-family: future-earth;
            color: #0AB1FF;
            height:18px;
            background:none;
            border:0;
        }

        .range-container {
            position:relative;
            width:100%;
            height: 30px;
        }

        .handle-container {
            position:absolute;
            top: 0;
            left: 17px;
            right: 17px;
            bottom: 0;
        }

        .handle {
            position: absolute;
            top: -2px;
            left:0;
            height: 34px;
            width: 34px;
            background-color: rgba(10, 177, 255, 0.95);
            transform: translate(-50%, 0);
            cursor: grab;
            user-select: none;
        }

        .range {
            border: 2px solid rgba(10, 177, 255, 1);   
            background-color: rgba(10, 177, 255, 0.15);
            color: rgba(10, 177, 255, 1);
            width: 100%;
            height: 30px;
            font-size: 16px;
            box-sizing: border-box;
        }   
        
        .volumn {
            position:absolute;
            top:0;
            left:0;
            height: 100%;
            background-color: rgba(10, 177, 255, 0.50);
        }
    </style>
`;

export default class RangeInput extends BaseElement {
    constructor() {
        super();

        const value = new Number(this.getAttribute("value")).valueOf();
        this._max = new Number(this.getAttribute("max")).valueOf();
        this._min = new Number(this.getAttribute("min")).valueOf();
        this._mouseStartX = null;
        this._startPercentage = null;
        this.boundingClientRect = null;

        if (this.isValidRange()) {
            this.value = value;
        } else {
            this._max = 0;
            this._min = 100;
            this.value = 0;
        }

        this.value = value;
        this.onHandleEnd = this.onHandleEnd.bind(this);
        this.onHandleStart = this.onHandleStart.bind(this);
        this.onHandleMove = this.onHandleMove.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.value = newValue;
    }

    isValidRange() {
        if (typeof this._max !== "number") {
            return false;
        }

        if (typeof this._min !== "number") {
            return false;
        }

        if (this._min > this.max) {
            return false;
        }

        return true;
    }

    get percentage() {
        return this._percentage;
    }

    set percentage(value) {
        if (value < 0) {
            value = 0;
        }

        if (value > 1) {
            value = 1;
        }

        this.value = (value * (this._max - this._min)) + this._min;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (value === this._value) {
            return;
        }

        value = new Number(value).valueOf();

        if (Number.isNaN(value)) {
            this._value = this._min;
        } else if (value < this._min) {
            this._value = this._min;
        } else if (value > this._max) {
            this._value = this._max;
        } else if (value >= this._min && value <= this._max) {
            this._value = value;
        }

        this._percentage = (this._value - this._min) / (this._max - this._min);

        if (this.getAttribute("value") != this._value.toString()) {
            this.setAttribute("value", this._value.toString());
        }

        this.scheduleUpdate();

    }

    get max() {
        return this._max;
    }

    get min() {
        return this._min;
    }

    get label() {
        return this.getAttribute("label") || "";
    }

    updateHandle(delta) {
        const deltaPercentage = delta / this.boundingClientRect.width;
        this.percentage = this._startPercentage + deltaPercentage;
    }

    onHandleStart(event) {
        this._mouseStartX = event.clientX;
        this._startPercentage = this._percentage;
        this.boundingClientRect = this.shadowRoot
            .querySelector(".handle-container")
            .getBoundingClientRect();

        document.documentElement.addEventListener("mouseup", this.onHandleEnd, false);
        document.documentElement.addEventListener("mousemove", this.onHandleMove, false);
    }

    onHandleMove(event) {
        if (this._mouseStartX != null) {
            const currentX = event.clientX;
            const delta = currentX - this._mouseStartX;

            this.updateHandle(delta);
        }
    }

    onHandleEnd(event) {
        this.onHandleMove(event);
        this._mouseStartX = null;
        this._startPercentage = null;

        document.documentElement.removeEventListener("mouseup", this.onHandleEnd);
        document.documentElement.removeEventListener("mousemove", this.onHandleMove);
    }

    onValueChange(event) {
        this.value = event.target.value
    }

    afterUpdate() {
        this.shadowRoot.querySelector("input").value = this._value.toFixed(2);
    }

    render() {
        const min = this.min;
        const max = this.max;
        const label = this.label;

        if (Number.isNaN(min) || Number.isNaN(max)) {
            return html`Invalid Range`;
        }

        return html`
            ${style}
            <div class="container">
                <div class="data">
                    <div class="label">${label}</div>
                    <input class="value" type="text" value=${this.value.toFixed(2)} @change=${this.onValueChange} />
                </div>
                <div class="range-container">
                    <div class="range"></div>
                    <div class="volumn" style="width:${this._percentage * 100}%;"></div>
                    <div class="handle-container">
                        <div 
                            @mousedown=${this.onHandleStart} 
                            @mousemove=${this.onHandleMove} 
                            style="left:${this._percentage * 100}%" 
                            class="handle">
                            </div>
                    </div>
                </div>
            </div>
                
        `;
    }
}

customElements.define("range-input", RangeInput);