import { html } from '../../lit-html/lit-html.js';
import "../UIButton.js";

const style = html`
<style>
    .container {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 78px auto;
        width: 100%;
        height:100%;
        overflow:hidden;
    }

    .header {
        display: grid;
        grid-template-columns: 20% auto 20%;
        grid-column-start: 1;
        grid-column-end: 1;
        grid-row-start:1;
        grid-row-end:1;
        border-bottom: 1px solid rgba(10, 177, 255, 1);
        box-sizing: border-box;
    }

    .main {
        grid-column-start: 1;
        grid-column-end: 1;
        grid-row-start:2;
        grid-row-end:2;
        font-size: 12px;
        position:relative;
        overflow:hidden;
    }

    .left-slot {
        text-align: left;
        grid-column-start: 1;
        grid-column-end: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right-slot {
        text-align:right;
        grid-column-start: 3;
        grid-column-end: 3;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .center-slot {
        text-align: center;
        grid-column-start: 2;
        grid-column-end: 2;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
`;

const onClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const onBackEvent = new CustomEvent("back");
    event.target.dispatch(onBackEvent);
}

export default ({ showBackButton, content, title }) => {
    return html`
    ${style}
    <div class="container">
        <div class="header">
            <div class="left-slot">
                ${showBackButton ? html`<ui-button @click=${onClick}>&lt; back</ui-button>` : html``}
            </div>
            <div class="center-slot">${title || ""}</div>
            <div class="right-slot"></div>
        </div>
        <div class="main">
            ${content}
        </div>
    </div>
`;
}