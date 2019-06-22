import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/keyboard-observer.js',
  output: {
    file: 'dist/keyboard-observer.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    production && terser(),
  ]
};
