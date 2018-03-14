const path = require('path');

const render = {
    entry: "./docs/examples/systems/CameraSystem/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'docs/examples/systems/cameraSystem/dist')
    }
}

module.exports = [
    render
];