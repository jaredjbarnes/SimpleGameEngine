import Ground from "./Ground";
import Bush from "../../entities/Bush";
import Tree from "../../entities/Tree";
import Flower from "../../entities/Flower";

export default {
    "d-d-d-d-d": () => {
        return new Ground("d-d-d-d-d");
    },
    "d-d-d-d-g": () => {
        return new Ground("d-d-d-d-g");
    },
    "d-d-d-g-d": () => {
        return new Ground("d-d-d-g-d");
    },
    "d-d-d-g-g": () => {
        return new Ground("d-d-d-g-g");
    },
    "d-d-g-d-d": () => {
        return new Ground("d-d-g-d-d");
    },
    "d-g-g-d-d": () => {
        return new Ground("d-g-g-d-d");
    },
    "d-d-g-g-d": () => {
        return new Ground("d-d-g-g-d");
    },
    "d-d-g-g-g": () => {
        return new Ground("d-d-g-g-g");
    },
    "d-d-g-d-g": () => {
        return new Ground("d-d-g-d-g");
    },
    "d-g-d-d-d": () => {
        return new Ground("d-g-d-d-d");
    },
    "d-g-d-d-g": () => {
        return new Ground("d-g-d-d-g");
    },
    "d-g-d-g-d": () => {
        return new Ground("d-g-d-g-d");
    },
    "d-g-d-g-g": () => {
        return new Ground("d-g-d-g-g");
    },
    "d-g-g-d-g": () => {
        return new Ground("d-g-g-d-g");
    },
    "d-g-g-g-d": () => {
        return new Ground("d-g-g-g-d");
    },
    "d-g-g-g-g": () => {
        return new Ground("d-g-g-g-g");
    },
    "g-g-g-g-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-g-g-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-d-g-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-g-d-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-g-g-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-d-g-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-d-d-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-g-d-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-g-g-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-d-d-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-d-d-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-g-d-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-d-g-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-g-d-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-g-d-g-d": () => {
        return new Ground("g-g-g-g-g");
    },
    "g-d-g-d-g": () => {
        return new Ground("g-g-g-g-g");
    },
    "bush": () => {
        return new Bush();
    },
    "tree": () => {
        return new Tree();
    },
    "flower": () => {
        return new Flower();
    }
}