const fs = require("fs");
const Terser = require("terser");

(async () => {
    let minified = (await Terser.minify(fs.readFileSync("src/bubbly-bg.js", "utf8"))).code;
    fs.writeFileSync("dist/bubbly-bg.js", minified, "utf8");
    fs.writeFileSync("docs/bubbly-bg.js", minified, "utf8");
})();
