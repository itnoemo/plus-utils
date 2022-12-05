import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel'
export default {
    input: "src/index.ts",
    output: [
      {
        file: "lib/index.umd.js",
        format: "umd",
        name: "plusUtils"
      },
      {
        file: "lib/index.iife.js",
        format: "iife",
        name: "plusUtils"
      }
    ],
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      typescript({
        exclude: "node_modules/**"
      })
    ]
};