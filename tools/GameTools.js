import BaseElement from "./BaseElement.js";
import "./UIProperty.js";
import "./UIWindow.js";
import "./EntitiesList.js";
import { html } from "../src/lit-html/lit-html.js";

const style = html`
    <style>
        .container {
            width:100%;
            height:100%;
            overflow: auto;
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

export default class GameTools extends BaseElement {
    constructor() {
        super();

    }

    render() {
        
    }
}

customElements.define("game-tools", GameTools);