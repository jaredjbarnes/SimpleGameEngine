import { html } from '../lit-html/lit-html.js';
import BaseElement from "./BaseElement.js";
import "./UIContainer.js";
import "./UIScrollContainer.js";
import "./UIButton.js";

const style = html`
<style>
    .container {
        display: flex;
        flex-direction:column;
        background: repeating-linear-gradient(
            0deg,
            rgba(10, 177, 255, 0.25),
            rgba(10, 177, 255, 0.25) 1px,
            #000 3px,
            #000 6px
          );
        width: 100%;
        height:100%;
        overflow:hidden;
    }

    .header {
        display: grid;
        grid-template-columns: 20% auto 20%;
        height: 78px;
    }

    .main {
        flex: 1;
        font-size: 12px;
        overflow: auto;
    }

    .left-slot {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        text-align: left;
        grid-column-start: 1;
        grid-column-end: 1;
    }

    .right-slot {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
        text-align:right;
        grid-column-start: 3;
        grid-column-end: 3;
    }

    .center-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        grid-column-start: 2;
        grid-column-end: 2;
        font-size: 14px;
    }

</style>
`;


export default class UINavigation extends BaseElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="container">
                ${style}
                <ui-container class="header">
                    <div class="left-slot">
                        <ui-button mode="left">&lt;&nbsp;BACK</ui-button>
                    </div>
                    <div class="center-slot">Title</div>
                    <div class="right-slot"></div>
                </ui-container>
                <ui-scroll-container class="main">
                    <slot name="root-content"></slot>
                </ui-scroll-container>
            </div>
            `;
    }
}

customElements.define('ui-navigation', UINavigation);