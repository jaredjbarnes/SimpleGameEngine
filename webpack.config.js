const path = require("path");
const fs = require("fs");
const examplesRoot = path.resolve(__dirname, "docs/examples/systems");
const folders = fs.readdirSync(examplesRoot);

const systemBuilds = folders.filter((item)=>{
    return item.indexOf(".") < 0;
}).map((systemName) => {
    return {
        entry: path.resolve(examplesRoot, `${systemName}/index.js`),
        output: {
            filename: "index.js",
            path: path.resolve(examplesRoot, `${systemName}/dist`)
        }
    }
});

module.exports = systemBuilds;