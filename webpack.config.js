const path = require('path');

const index = {
    entry: "./src/examples/basic/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist/basic')
    }
};


module.exports = [index];