import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: "src/index.ts",
    output: [
      {
        file: "lib/index.umd.js",
        format: "umd",
        name: "plusUtils"
      },
      {
        file: "docs/index.iife.js",
        format: "iife",
        name: "plusUtils"
      }
    ],
    plugins: [
      commonjs({
        include: "node_modules/**"
      }),
      babel({
        exclude: "node_modules/**"
      }),
      typescript({
        exclude: "node_modules/**"
      }),
      terser(),
      
      resolve()
    ],
    // external:['lodash']
};