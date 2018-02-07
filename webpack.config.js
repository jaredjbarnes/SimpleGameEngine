const path = require('path');

// const logicBox = {
//     entry: "./src/examples/basic/logicbox/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/logicbox/dist')
//     }
// }

const render = {
    entry: "./src/examples/basic/cameraSystem/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/basic/cameraSystem/dist')
    }
}

// const sprite = {
//     entry: "./src/examples/basic/sprites/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/sprites/dist')
//     }
// }

// const follower = {
//     entry: "./src/examples/basic/follower/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/follower/dist')
//     }
// }

// const rigidbody = {
//     entry: "./src/examples/basic/narrowPhaseCollidable/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/narrowPhaseCollidable/dist')
//     }
// }

// const animation = {
//     entry: "./src/examples/basic/animation/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/animation/dist')
//     }
// }

// const line = {
//     entry: "./src/examples/basic/line/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/line/dist')
//     }
// }

// const zIndex = {
//     entry: "./src/examples/basic/zIndex/index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, 'src/examples/basic/zIndex/dist')
//     }
// }


module.exports = [
   // logicBox,
    render,
    // sprite,
    // follower,
    // rigidbody,
    // animation,
    // line,
    // zIndex
];