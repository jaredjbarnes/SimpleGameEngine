import { html } from "../src/lit-html/lit-html.js";
import { styleMap } from "../src/lit-html/directives/style-map.js";
import BaseElement from "./BaseElement.js";

const style = html`
    <style>
        :host {
            display: block;
            position: relative;
            -webkit-overflow-scrolling: touch;
            overflow: auto;
        }

        .container {
            position: relative;  
        }
    </style>
`;

export default class InfiniteList extends BaseElement {
    constructor() {
        super();

        this._items = null;
        this._elementHeight = null;
        this.onScroll = this.onScroll.bind(this);
        this._getElement = null;
        this.addEventListener("scroll", this.onScroll, false);
    }

    connectedCallback() {
        this._upgradeProperty("items");
        this._upgradeProperty("elementHeight");
        this._upgradeProperty("getElement");
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    get elementHeight() {
        return this._elementHeight;
    }

    set elementHeight(value) {
        value = new Number(value).valueOf();
        if (!Number.isNaN(value)) {
            this._elementHeight = value;
        }
    }

    get getElement() {
        return this._getElement;
    }

    set getElement(value) {
        if (typeof value === "function") {
            this._getElement = value;
        }
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
        this.scheduleUpdate();
    }

    onScroll() {
        this.scheduleUpdate();
    }


    getElements() {
        const rect = this.getBoundingClientRect();
        const offset = Math.floor(this.scrollTop / this.elementHeight);
        const limit = Math.round((rect.height + (this.elementHeight * 2)) / this.elementHeight);

        const items = this.items.slice(offset, offset + limit);

        const elements = items.map((item, index) => {
            const style = {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                transform: `translate(0, ${(index + offset) * this.elementHeight}px)`
            };

            return html`
                <div
                    style=${styleMap(style)}>
                        ${this.getElement(item, index + offset)}
                </div>
            `;
        });

        if (rect.height === 0 && rect.width === 0) {
            setTimeout(() => {
                this.scheduleUpdate();
            }, 10);
        }

        return elements;
    }

    render() {
        if (typeof this._elementHeight !== "number") {
            return html`
                ${style}
                <div>
                    InfinteList needs to have a elementHeight property set as a number.
                </div>
            `;
        }

        if (typeof this.getElement !== "function") {
            return html`
                ${style}
                <div>
                    InfinteList needs to have a getElement property set as a function.
                </div>
            `;
        }

        if (Array.isArray(this.items)) {
            return html`
                ${style}
                <div class="container" style="height:${this.elementHeight * this._items.length}px;">
                    <slot></slot>
                </div>
            `;
        } else {
            return html`
                ${style}
                <div>
                    Empty List
                </div>
            `
        }
    }

    renderContent() {
        if (Array.isArray(this.items)) {
            return html`${this.getElements()}`;
        }

        return html``;
    }
}

customElements.define("infinite-list", InfiniteList);