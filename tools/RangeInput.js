import { html } from "../src/lit-html/lit-html.js";
import BaseElement from "./BaseElement.js"

const style = html`
    <style>
        :host{
            display: inline-block;
            min-width: 100px;
            user-select: none;
            font-family: arial;
        }

        .container{
            position:relative;
            width: 100%;
        }

        .data {
            font-size: 10px;
            text-align: left;
            height: 20px;
        }

        .value {
            text-align: right;
            font-size:10px;
            height:18px;
            background:none;
            border:0;
            color: #666;
            width: 100%;
        }

        .value:focus {
            outline: none;
        }

        .range-container {
            display:flex;
            align-items: center;
            justify-content: center;
            position:relative;
            width:100%;
            height: 30px;
        }

        .handle-container {
            position:absolute;
            top: 0;
            left: 15px;
            right: 15px;
            bottom: 0;
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
        }

        .range {
            position:relative;
            border: 1px solid #ccc;   
            background-color: #eff0f1;
            width: 100%;
            height: 30px;
            box-sizing: border-box;
            border-radius: 15px;
            overflow:hidden;
        }   

        .volumn {
            height: 30px;
            box-sizing: border-box;
            width:0;
            border-top: 1px solid #ccc;   
            border-bottom: 1px solid #ccc;
            background-color: #6d84a3;
        }

        .volumn-fill {
            position:absolute;
            top:0;
            left:0;
            width: 15px;
            height:30px;
            background-color: #6d84a3;
        }
    </style>
`;

export default class RangeInput extends BaseElement {
    constructor() {
        super();
        
        this._value = null;
        this._mouseStartX = null;
        this._startPercentage = null;
        this.boundingClientRect = null;
        this.onHandleEnd = this.onHandleEnd.bind(this);
        this.onHandleStart = this.onHandleStart.bind(this);
        this.onHandleMove = this.onHandleMove.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

    }

    connectedCallback() {
        const value = new Number(this.getAttribute("value")).valueOf();
        this._max = new Number(this.getAttribute("max")).valueOf();
        this._min = new Number(this.getAttribute("min")).valueOf();

        if (isNaN(value)) {
            value = this._min;
        }

        this.value = value;
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
        return new Number(this.getAttribute("max")).valueOf();
    }

    get min() {
        return new Number(this.getAttribute("min")).valueOf();
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

        if (Number.isNaN(min) || Number.isNaN(max)) {
            return html`Invalid Range`;
        }

        return html`
            ${style}
            <div class="container">
                <div class="data">
                    <input class="value" type="text" value=${this.value.toFixed(2)} @change=${this.onValueChange} />
                </div>
                <div class="range-container">
                    <div class="range">
                        <div class="volumn-fill"></div>
                    </div>
                    <div class="handle-container">
                        <div class="volumn" style="width:${this._percentage * 100}%" ><div>
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