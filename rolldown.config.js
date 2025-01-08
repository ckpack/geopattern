import { defineConfig } from 'rolldown'

export default defineConfig([
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/index.js'
    },
  },
  {
    input: 'src/index.js',
    output: {
      minify: true,
      format: 'esm',
      file: 'dist/index.min.js'
    },
  },
])