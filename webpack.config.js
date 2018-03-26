const path = require('path');

const cameraSystem = {
    entry: "./docs/examples/systems/CameraSystem/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'docs/examples/systems/cameraSystem/dist')
    }
}

const narrowPhaseCollisionSystem = {
    entry: "./docs/examples/systems/narrowPhaseCollisionSystem/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'docs/examples/systems/narrowPhaseCollisionSystem/dist')
    }
}

module.exports = [
    cameraSystem,
    narrowPhaseCollisionSystem
];