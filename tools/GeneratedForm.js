import BaseElement from "./BaseElement.js";
import "./RangeInput.js";
import "./BooleanInput.js";
import "./UIProperty.js";
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

        .description {
            padding: 10px;
            font-weight: normal;
        }

        .info {
            color: #6f85a4;
            font-weight: bold;
        }

        input {
            padding: 4px 0;
            background-color: #f1f1f1;
            height: 50px;
            width: 100%;
            font-size: 14px;
            padding-left:6px;
            box-sizing: border-box;
            border:0;
        }
        
        textarea {
            padding: 4px 0;
            background-color: #f1f1f1;
            border: 1px solid #ccc;
            height: 300px;
            width: 100%;
            font-size: 14px;
            padding-left:6px;
            box-sizing: border-box;
            resize: none;
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
            <ui-property>
                <div class="boolean-property-value">
                    ${label}
                    <boolean-input></boolean-input>
                </div>
            </ui-property>
        `;
    }

    integer(label, property) {
        return html`
            <ui-property label=${label}>
                <input type="number" step="1" />
            </ui-property>
        `;
    }

    number(label, property) {
        return html`
            <ui-property label=${label}>
                <input type="number"/>
            </ui-property>
        `;
    }

    string(label, property) {
        return html`
            <ui-property label=${label}>
                <input type="string"/>
            </ui-property>
        `;
    }

    range(label, property) {
        return html`
            <ui-property label=${label}>
                <div style="height:55px;width:100%;padding: 6px;">
                    <range-input min=${property.minimum} max=${property.maximum}></range-input>
                </div>
            </ui-property>
        `;
    }

    textarea(label, property){
        return html`
            <ui-property label=${label}>
                <textarea></textarea>
            </ui-property>
        `;
    }

    renderDescription(schema){
        if (typeof schema.description === "string"){
            return html`
                <div class="description"><span class="info">&#9432;</span> ${schema.description}</div>
            `;
        }

        return null;
    }

    renderObjectProperty(schema) {
        const properties = schema.properties || {};

        const parts = Object.keys(properties).map((key) => {
            const value = properties[key];
            return this[value.type](key, value);
        });

        parts.unshift(this.renderDescription(schema));

        return parts;
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