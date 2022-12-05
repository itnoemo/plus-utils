const typescript = require("rollup-plugin-typescript");
module.exports = {
    input: "src/index.ts",
    output: [
      {
        file: "lib/index.cjs.js",
        format: "cjs"
      },
      {
        file: "lib/index.esm.js",
        format: "es"
      },
    ],
    plugins: [
      typescript({
        exclude: "node_modules/**"
      })
    ]
};