import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: 'devicePilot',
    external: [
      'axios',
      'flat',
      'URL',
    ],
    globals: {
      axios: 'axios',
      flat: 'flat',
      'universal-url': 'URL',
    },
  },
  plugins: [
    builtins(),
    commonjs({
      namedExports: {
        flat: ['flat'],
      },
    }),
  ],
};
