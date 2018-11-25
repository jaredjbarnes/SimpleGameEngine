
import Noise from "../../../../src/utilities/Noise";

const noise = new Noise();
const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const scale = 1000;

const getColor = (x, y) => {
    return Math.floor(((noise.perlin(x / 50, y / 50) + 1) / 2) * 255);
};

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const value = getColor(x, y);
        context.fillStyle = `rgba(${value}, ${value}, ${value}, 1)`;
        context.fillRect(x, y, 1, 1);
    }
}
