
import Noise from "../../../../src/utilities/Noise.js";

const noise = new Noise(1234567000000000321);
const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const getColor = (x, y) => {
    return Math.floor(((noise.perlin(x / 20, y / 20) + 1) / 2) * 255);
};

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const value = getColor(x, y);
        context.fillStyle = `rgba(${value}, ${value}, ${value}, 1)`;
        context.fillRect(x, y, 1, 1);
    }
}
