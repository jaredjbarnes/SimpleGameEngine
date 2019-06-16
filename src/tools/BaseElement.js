import { html, render } from 'https://unpkg.com/lit-html?module';
import invokeMethodIfExists from "../utilities/invokeMethod.js";

export default class BaseElement extends HTMLElement {
    constructor() {
        super();
        this.pendingRender = false;
        this.afterUpdatePromisesResolvers = [];
        this.attachShadow({ mode: "open" });
        this.update();
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
                this.notifyPromises();

                invokeMethodIfExists(this, "afterUpdate", []);
            });
        }

        return new Promise((resolve) => {
            this.afterUpdatePromisesResolvers.push(resolve);
        });

    }

    attributeChangedCallback() {
        this.update();
    }

    renderShadowDom() {
        render(this.render(), this.shadowRoot);
    }

    render() {
        return html``;
    }
}
