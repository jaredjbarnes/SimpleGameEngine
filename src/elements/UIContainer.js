import { html } from "../lit-html/lit-html.js";
import BaseElement from "./BaseElement.js";

const style = html`
<style>
    :host {
        position:relative;
        display: inline-block;
        box-sizing: border-box;
        padding: 15px;
        overflow:auto;
    }

    .decoration {
        position:absolute;
        box-sizing: border-box;
        top: 7px;
        left: 7px;
        right:7px;
        bottom:7px;   
        border: 1px solid rgba(10, 177, 255, 1);   
        box-sizing: border-box;
        pointer-events: none;
    }

    .cross {
        width: 15px;
        height: 15px;
        background: linear-gradient(to bottom, transparent 7px, #d00 7px, #d00 8px,  transparent 8px),
            linear-gradient(to right, transparent 7px, #d00 7px, #d00 8px, transparent 8px);
        }

    .top-left-cross {
        position:absolute;
        top: -8px;
        left: -8px;
    }

    .top-right-cross {
        position:absolute;
        top: -8px;
        right: -8px;
    }

    .bottom-left-cross {
        position:absolute;
        bottom: -8px;
        left: -8px;
    }

    .bottom-right-cross {
        position:absolute;
        bottom: -8px;
        right: -8px;
    }

    .secondary-cross {
        opacity: 0.50;
    }

    .secondary-border {
        border: 1px solid rgba(10, 177, 255, 0.50);
    }

</style>
`;


export default class UIContainer extends BaseElement {
    constructor() {
        super();
    }

    render() {
        return html`
                ${style}
                <div class="decoration">
                    <div class="top-left-cross cross"></div>
                    <div class="top-right-cross cross"></div>
                    <div class="bottom-left-cross cross"></div>
                    <div class="bottom-right-cross cross"></div>
                </div>
                <slot></slot>   
            `;
    }
}

customElements.define('ui-container', UIContainer);