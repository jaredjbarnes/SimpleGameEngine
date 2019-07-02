import { html } from '../../lit-html/lit-html.js';
import BaseElement from "../BaseElement.js";
import navigation from "./navigation.js"
import "./EntitiesList.js";

const style = html`
    <style>
        :host {
            display: block;
            background: repeating-linear-gradient(
                0deg,
                rgba(10, 177, 255, 0.25),
                rgba(10, 177, 255, 0.25) 1px,
                #000 3px,
                #000 6px
            );
        }

        
    </style>
`;

export default class WorldInspector extends BaseElement {
    constructor() {
        super();
        this._world = null;
        this.entities = [];
        this.selectedEntity = null;
        this.selectedComponent = null;
        this.onBack = this.onBack.bind(this);
        this.name = "world-inpsector";

        this.addEventListener("back", this.onBack);
    }

    onBack(event) {

    }

    get world() {
        return this._world;
    }

    set world(value) {
        this._world = value;
        this._world.removeSystem(this);
        value.addSystem(this);

        this.reset();
        this.scheduleUpdate();
    }

    reset() {
        this.entities = this._world.getEntities();
        this.selectedComponent = null;
        this.selectedEntity = null;
    }

    entityAdded(entity) {
        this.entities.push(entity);
        this.scheduleUpdate();
    }

    entityRemoved(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }

        this.scheduleUpdate();
    }

    componentRemoved(entity, component) {
        if (component === this.selectedComponent) {
            this.scheduleUpdate();
        }
    }

    componentAdded(entity, component) {
        if (component === this.selectedComponent) {
            this.scheduleUpdate();
        }
    }

    renderEntitiesList() {
        return html`
            <style>
                entities-list {
                    position:absolute;
                    top:0;
                    left:0;
                    bottom:0;
                    right:0;
                }
            </style>
            <entities-list .length=${this.entities.length} .entities=${this.entities}></entities-list>
        `;
    }

    renderEntityInspector() {
        return html`entity`;
    }

    renderComponentInspector() {
        return html`component`;
    }

    render() {
        if (this.world == null) {
            return html`
                ${style}
                ${navigation({
                showBackButton: false,
                content: html`No World`
            })}
            `;
        } else if (this.selectedComponent !== null) {
            return html`
                ${style}
                ${navigation({
                showBackButton: true,
                content: this.renderComponentInspector()
            })}
            `;
        } else if (this.selectedEntity !== null) {
            return html`
                ${style}
                ${navigation({
                title: this.selectedEntity.id,
                showBackButton: true,
                content: this.renderEntityInspector()
            })}
            `;
        } else if (Array.isArray(this.entities)) {
            return html`
                ${style}
                ${navigation({
                title: "Entities",
                showBackButton: false,
                content: this.renderEntitiesList()
            })}
            `;
        } else {
            return html`Oh Dear`;
        }
    }
}

customElements.define("world-inspector", WorldInspector);