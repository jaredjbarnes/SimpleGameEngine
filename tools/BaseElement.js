import { html, render } from '../src/lit-html/lit-html.js';
import invokeMethodIfExists from "../src/utilities/invokeMethod.js";

export default class BaseElement extends HTMLElement {
    constructor() {
        super();
        this.pendingRender = false;
        this.afterUpdatePromisesResolvers = [];
        this.attachShadow({ mode: "open" });
        this.scheduleUpdate();
    }

    notifyPromises() {
        const resolvers = this.afterUpdatePromisesResolvers;
        this.afterUpdatePromisesResolvers = [];

        resolvers.forEach(resolve => resolve());
    }

    scheduleUpdate() {
        if (!this.pendingRender) {
            this.pendingRender = true;

            requestAnimationFrame(() => {
                invokeMethodIfExists(this, "beforeUpdate", []);

                this.pendingRender = false;
                this.renderShadowDom();
                this.renderContentDom();
                this.notifyPromises();

                invokeMethodIfExists(this, "afterUpdate", []);
            });
        }

        return new Promise((resolve) => {
            this.afterUpdatePromisesResolvers.push(resolve);
        });

    }

    attributeChangedCallback() {
        this.scheduleUpdate();
    }

    renderShadowDom() {
        render(this.render(), this.shadowRoot);
    }

    renderContentDom() {
        if (typeof this.renderContent === "function") {
            render(this.renderContent(), this);
        }
    }

    render() {
        return html``;
    }
}
