const path = require('path');

const logicBox = {
    entry: "./src/examples/basic/logicbox/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/basic/logicbox/dist')
    }
}

const render = {
    entry: "./src/examples/basic/render/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/basic/render/dist')
    }
}

const sprite = {
    entry: "./src/examples/basic/sprites/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/basic/sprites/dist')
    }
}

const follower = {
    entry: "./src/examples/basic/follower/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/basic/follower/dist')
    }
}


module.exports = [logicBox, render, sprite, follower];