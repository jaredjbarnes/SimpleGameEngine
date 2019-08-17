import { html } from "../src/lit-html/lit-html.js";
import BaseElement from "./BaseElement.js";

const style = html`
    <style>
        .container {
            width:100%;
            height:100%;
            overflow: auto;
        }

        .item {
            height:50px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            line-height:50px;
            padding-left: 6px;
            cursor: pointer;
            user-select:none;
        }

        .item:hover {
            background-color:#fefefe;
        }

        .item:active {
            background-color:rgba(0, 0, 0, 0);
        }

        .item:last-child {
            border-bottom: 0;
        }
    </style>
`;

export default class ToolsMenu extends BaseElement {
    constructor() {
        super();

        this.mapping = {
            entities: {
                template: "createEntitiesList",
                name: "Entities"
            }
        };

        this._world = null;
        this._entities = null;
    }

    get world() {
        return this._world;
    }

    set world(value) {
        this._world = value;
        this._entities = this._world._entities;
    }

    render() {
        return html`
        ${style}
        <div class="container">
            <ui-property label="World Tools">
                <div @click=${this.onClick} class="item" data-window="entities">Entities</div>
                <div @click=${this.onClick} class="item" data-window="modes">Modes</div>
            </ui-property>
            <ui-property label="Loaders">
                <div @click=${this.onClick} class="item" data-window="worldLoader">World</div>
                <div @click=${this.onClick} class="item" data-window="entitiesLoader">Entities</div>
            </ui-property>
            <ui-property label="Template Builders">
                <div @click=${this.onClick} class="item" data-window="entityTemplateBuilder">Entity Template Builder</div>
                <div @click=${this.onClick} class="item" data-window="modeTemplateBuilder">Mode Template Builder</div>
            </ui-property>
        </div>
    `;
    }

    createEntitiesList() {
        return html`
            return 
        `;
    }

    onClick(event) {
        const name = event.target.getAttribute("data-window");
        const config = this.mapping[name];

        if (typeof this[config.template] !== "function") {
            return;
        }

        const customEvent = new CustomEvent("open-window", {
            detail: {
                name: config.name,
                content: this[config.template]()
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(customEvent);
    }
}

