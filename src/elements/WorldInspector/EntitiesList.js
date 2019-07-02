import "../InfiniteList.js";
import BaseElement from "../BaseElement.js";
import { html } from "../../lit-html/lit-html.js";

const style = html`
    <style>
        :host {
            display: block;
            position:relative;
        }

        infinite-list {
            width:100%;
            height:100%;
        }

        .item {
            cursor: pointer;
            width: 100%;
            height: 50px;
            line-height: 46px;
            padding-left: 10px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(10, 177, 255, 1);
            font-size: 10px;
        }

        .item:hover {
            background-color: rgba(10, 177, 255, 0.35);
        }
    </style>
`;

export default class EntitiesList extends BaseElement {

    constructor() {
        super();
        this._entities = null;
    }

    get entities() {
        return this._entities;
    }
    set entities(value) {
        this._entities = value;
        this.scheduleUpdate();
    }

    connectedCallback() {
        this._upgradeProperty("entities");
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    onClick(event) {
        console.log(event.target.getAttribute("data-id"));
    }

    getElement(item, index) {
        return html`
            <div data-id=${item.id} @click=${this.onClick} class="item">
                ${item.type}
            </div>
        `;
    }

    render() {
        return html`
            ${style}
            <infinite-list 
                .elementHeight=${50} 
                .items=${this._entities} 
                .getElement=${this.getElement}>
            </infinite-list>
        `;
    }

}

customElements.define("entities-list", EntitiesList);