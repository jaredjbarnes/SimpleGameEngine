const path = require('path');

const systems = [
    "cameraSystem",
    "narrowPhaseCollisionSystem",
    "cursorSystem"
];

const games = [
    "asteroids"
];

const systemBuilds = systems.map((systemName) => {
    return {
        entry: path.resolve(__dirname, `docs/examples/systems/${systemName}/index.js`),
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, `docs/examples/systems/${systemName}/dist`)
        }
    }
});

// const gameBuilds = systems.map((gameName) => {
//     return {
//         entry: path.resolve(__dirname, `docs/examples/games/${gameName}/index.js`),
//         output: {
//             filename: "index.js",
//             path: path.resolve(__dirname, `docs/examples/games/${gameName}/dist`)
//         }
//     }
// });

module.exports = systemBuilds;