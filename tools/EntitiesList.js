import { html } from "../src/lit-html/lit-html.js";
import BaseElement from "./BaseElement.js";
import "./InfiniteList.js";

const style = html`
    <style>
        :host {
            display: block;
        }

        infinite-list {
            width: 100%;
            height:100%;
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

export default class EntitiesList extends BaseElement {
    constructor() {
        super();
        this._world = null;
        this._entities = [];
        this.getElement = this.getElement.bind(this);
    }

    entityAdded(){

    }

    entityRemove(){

    } 

    get world() {
        return this._world;
    }

    set world(value) {
        if (this._world != null){
            this._world.removeSystem(this);
        }
        
        this._world = value;
        this._entities = this._world._entities;

        this.scheduleUpdate();
    }

    connectedCallback() {
        this._upgradeProperty("world");
    }

    disconnectedCallback() {
        if (this._world == null) {
            return;
        }

        this.removeSystem(this);
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    render() {
        return html`
            <infinite-list 
                .elementHeight=${50} 
                .items=${this._entities} 
                .getElement=${this.getElement}
            >
            ></infinite-list>
        `;
    }

    getElement(entity) {
        return html`
            <div class="item">${entity.id}</div>
        `;
    }
}

customElements.define("entities-list", EntitiesList);