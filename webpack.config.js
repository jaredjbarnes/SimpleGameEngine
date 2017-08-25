const path = require('path');

const zelda = {
    entry: "./src/examples/zelda/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/zelda/dist')
    }
};

const logicBox = {
    entry: "./src/examples/basic/logicbox.js",
    output: {
        filename: "logicbox.js",
        path: path.resolve(__dirname, 'src/examples/basic/dist')
    }
}

module.exports = [zelda, logicBox];