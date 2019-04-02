export default [
  createConfig({
    input: 'src/shave.js',
    output: [{ file: main, format: 'umd' }, { file: module, format: 'es' }],
  }),
  createConfig({
    input: 'src/shave.js',
    output: {
      file: 'dist/shave.min.js',
      format: 'umd',
    },
    env: 'production',
  }),
];
