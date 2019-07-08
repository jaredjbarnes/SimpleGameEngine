import BaseElement from "./BaseElement.js";
import { html } from "../src/lit-html/lit-html.js";
import { classMap } from "../src/lit-html/directives/class-map.js";

const style = html`
    <style>
    
        :host {
            position:absolute;
            top:0;
            left:0;
            display: block;
            min-width: 300px;
            min-height: 300px;
            font-family: arial;
        }

        .container {
            display: grid;
            grid-template-columns: 1px auto 1px;
            grid-template-rows: 50px auto 1px;
            width:100%;
            height:100%;
            background-color: rgba(179,179,179,1);
            border-radius: 4px 4px 0 0;
            min-width: 300px;
            min-height: 300px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.5);
            border-top: 1px groove #92abc5;
        }

        .handle {
            display: grid;
            grid-template-columns:100px auto 100px;
            grid-row-start: 1;
            grid-row-end: 1;
            grid-column-start: 1;
            grid-column-end: 4;
            box-sizing: border-box;
            user-select: none;
            font-size: 16px;
            border-radius: 4px 4px 0 0;
            background: linear-gradient(0deg, #6d84a3  0%, #b1bdc9 100%);
            color: #fff;
        }

        .handle-right {
            position:relative;
            grid-column-start: 3;
            grid-column-end: 3;
        }

        .handle-title {
            display:flex;
            align-items: center;
            justify-content: center;
            position:relative;
            grid-column-start: 2;
            grid-column-end: 2;
            user-select: none;
            cursor: default;
        }

        .handle-left {
            display:flex;
            align-items: center;
            justify-content: flex-start;
            position:relative;
            grid-column-start: 1;
            grid-column-end: 1;
        }

        .close-button {
            position:absolute;
            top: 10px;
            right: 10px;
            height: 13px;
            width: 13px;
            border-radius:50% 50%;
            background-color: red;
            cursor: pointer;
            box-sizing: border-box;
            border: 1px solid #e20000;
        }

        .close-button:hover {
            background-color: #ff3535;
        }

        .close-button:active {
            background-color: #b70000;
        }

        .footer {
            position: relative;
            grid-row-start: 3;
            grid-row-end: 3;
            grid-column-start: 1;
            grid-column-end: 4;
            box-sizing: border-box;
        }

        .resize {
            position:absolute;
            right:-15px;
            bottom:-15px;
            height: 20px;
            width: 20px;
            cursor: nwse-resize;
        }

        .body {
            position: relative;
            grid-row-start: 2;
            grid-row-end: 2;
            grid-column-start:2;
            grid-column-end:2;
            box-sizing: border-box;
            background-color: #dbddde;
            overflow: hidden;
        }

        .body-wrapper {
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            overflow: hidden;
            background-color:#dbddde;
        }

    </style>
`;

let currentZIndex = 0;

export default class UIWindow extends BaseElement {
    constructor() {
        super();

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResizeMove = this.onResizeMove.bind(this);
        this.onResizeEnd = this.onResizeEnd.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onClose = this.onClose.bind(this);

        this.style.zIndex = currentZIndex++;

        this.drag = {
            client: {
                x: 0,
                y: 0
            },
            position: {
                x: 0,
                y: 0
            }
        };

        this.resize = {
            client: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        }

    }

    isClosable() {
        const closable = this.getAttribute("closable");

        if (closable === "false" || closable == null) {
            return false;
        } else {
            return true;
        }
    }

    isResizeable() {
        const resizable = this.getAttribute("resizable");

        if (resizable === "true" || resizable == null) {
            return true;
        } else {
            return false;
        }
    }

    onFocus() {
        if (this.style.zIndex != currentZIndex - 1) {
            this.style.zIndex = currentZIndex++;
        }
    }

    onClose(event) {
        this.parentElement.removeChild(this);

        event.preventDefault();
        event.stopPropagation();
    }

    onDragStart(event) {
        this.style.zIndex = currentZIndex++;
        this.drag.client.x = event.clientX;
        this.drag.client.y = event.clientY;
        this.drag.position.x = this.offsetLeft;
        this.drag.position.y = this.offsetTop;

        document.addEventListener("mousemove", this.onDragMove, false);
        document.addEventListener("mouseup", this.onDragEnd, false);

        event.preventDefault();
        event.stopPropagation();
    }

    onDragMove(event) {
        const deltaX = event.clientX - this.drag.client.x;
        const deltaY = event.clientY - this.drag.client.y;

        this.style.left = `${this.drag.position.x + deltaX}px`;
        this.style.top = `${this.drag.position.y + deltaY}px`;

        event.preventDefault();
        event.stopPropagation();
    }

    onDragEnd(event) {
        this.onDragMove(event);

        document.removeEventListener("mousemove", this.onDragMove);
        document.removeEventListener("mouseup", this.onDragEnd);

        event.preventDefault();
        event.stopPropagation();
    }

    onResizeStart(event) {
        this.style.zIndex = currentZIndex++;
        this.resize.client.x = event.clientX;
        this.resize.client.y = event.clientY;
        this.resize.size.width = this.offsetWidth;
        this.resize.size.height = this.offsetHeight;

        document.addEventListener("mousemove", this.onResizeMove, false);
        document.addEventListener("mouseup", this.onResizeEnd, false);

        event.preventDefault();
        event.stopPropagation();
    }

    onResizeMove(event) {
        const deltaX = event.clientX - this.resize.client.x;
        const deltaY = event.clientY - this.resize.client.y;

        this.style.width = `${this.resize.size.width + deltaX}px`;
        this.style.height = `${this.resize.size.height + deltaY}px`;

        event.preventDefault();
        event.stopPropagation();
    }

    onResizeEnd(event) {
        this.onResizeMove(event);

        document.removeEventListener("mousemove", this.onResizeMove);
        document.removeEventListener("mouseup", this.onResizeEnd);

        event.preventDefault();
        event.stopPropagation();
    }

    swallowEvent(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        let title = this.getAttribute("title") || "";

        return html`
            ${style}
            <div class="container" @mousedown=${this.onFocus}>
                <div class="handle" @mousedown=${this.onDragStart}>
                    <div class="handle-left"> </div>
                    <div class="handle-title">${title}</div>
                    <div class="handle-right">
                        ${this.isClosable() ? html`<div class="close-button" @mousedown=${this.swallowEvent} @click=${this.onClose}></div>` : html``}
                    </div>
                </div>
                <div class="body" @push=${this.onPush}>
                    <div class="body-wrapper">
                        <slot></slot>
                    </div>
                </div>
                <div class="footer">
                    ${this.isResizeable() ? html`<div class="resize" @mousedown=${this.onResizeStart}></div>` : html``}
                </div>
            </div >
    `;
    }
}

customElements.define("ui-window", UIWindow);