const path = require('path');

const zelda = {
    entry: "./src/examples/zelda/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'src/examples/zelda/dist')
    }
};

module.exports = [zelda];