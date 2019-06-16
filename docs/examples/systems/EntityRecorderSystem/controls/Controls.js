export default class Controls {
    constructor({ canvas, world, player }) {
        this.canvas = canvas;
        this.world = world;
        this.player = player;
    }
}


const button = document.createElement("button");
button.innerText = "Start Recording";

const button