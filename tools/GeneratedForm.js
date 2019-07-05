import BaseElement from "./BaseElement.js";
import "./RangeInput.js";
import "./BooleanInput.js";
import { html } from "../src/lit-html/lit-html.js"

const style = html`
    <style>
        :host {
            display: block;
            background-color: #dbddde;
            font-size: 12px;
            font-weight: bold;
            font-family: arial;
            color: #666;
        }

        .property-label {
            padding-top: 20px;
            padding-bottom: 4px;
            padding-left: 6px;
            text-transform: uppercase;
        }
       
        .property-value {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 100%;
            background-color: #f1f1f1;
            border: 1px solid #ccc;
            padding:6px;
            box-sizing: border-box;
        }

        .boolean-property-value {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            width: 100%;
            background-color: #f1f1f1;
            border: 1px solid #ccc;
            padding:6px;
            box-sizing: border-box;
            text-transform: uppercase;
        }

        input {
            padding: 4px 0;
            background-color: #f1f1f1;
            border: 1px solid #ccc;
            height: 50px;
            width: 100%;
            font-size: 14px;
            padding-left:6px;
            box-sizing: border-box;
        }

        range-input {
            width:100%;
        }
    </style>
`;

export default class GeneratedForm extends BaseElement {
    constructor() {
        super();
        this._schema = null;

    }

    set schema(value) {
        this._schema = value;
        this.scheduleUpdate();
    }

    get schema() {
        return this._schema;
    }

    boolean(label, property) {
        return html`
                <div class="property-label"></div>
                <div class="boolean-property-value">
                ${label}
                <boolean-input></boolean-input>
                </div>
        `;
    }

    integer(label, property) {
        return html`
            <div class="property-label">${label}</div>
            <input type="number" step="1" />
        `;
    }

    number(label, property) {
        return html`
            <div class="property-label">${label}</div>
            <input type="number"/>
        `;
    }

    string(label, property) {
        return html`
            <div class="property-label">${label}</div>
            <input type="string" />
        `;
    }

    range(label, property) {
        return html`
            <div class="property-label">${label}</div>
            <div class="property-value" style="height:75px;">
                <range-input min=${property.minimum} max=${property.maximum}></range-input>
            </div>
        `;
    }

    renderObjectProperty(schema) {
        const properties = schema.properties || {};

        return Object.keys(properties).map((key) => {
            const value = properties[key];
            return this[value.type](key, value);
        });
    }

    render() {
        if (this._schema != null) {
            return html`
                ${style}
                ${this.renderObjectProperty(this._schema)}
            `;
        }

        return null;
    }
}

customElements.define("generated-form", GeneratedForm);