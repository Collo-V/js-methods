import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import { createRequire } from 'node:module'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
import * as path from 'node:path'
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  del({ targets: 'dist/*' }), // 1. Clean dist folder BEFORE building
  alias({
    entries:[
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ]
  }),
  peerDepsExternal(),
  json(),
  resolve({ extensions }),
  commonjs(),
  typescript({
    check: true,
    tsconfig: './rollup.tsconfig.json',
    useTsconfigDeclarationDir: true,
    clean:true,
  }),
  babel({
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript' // <-- Highly recommended if Babel handles TS files
    ],
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    extensions: extensions // <-- Updated to include ['.js', '.jsx', '.ts', '.tsx']
  }),
  terser() // <-- Minify at the very end
]

const external = ['react','react-dom','next','react-icons','antd','sweetalert2']

export default [
  {
  input: 'src/entry.ts',
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      inlineDynamicImports: true,
      sourcemap: true,
    },
  ],
  plugins,
  external,
},
{
  input: 'src/entry.ts',
  output: [{ file: 'dist/entry.d.ts', format: 'esm' }], // Drops entry.d.ts right in dist/
  plugins: [
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    }),
    dts(), // Bundles all declarations cleanly into one file
  ],
}
]