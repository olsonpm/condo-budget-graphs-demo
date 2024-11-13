import { buildConfig } from './vite.common.config.mjs'

export default buildConfig({
  build: {
    outDir: 'dist/app',
    rollupOptions: {
      input: {
        index: 'index.html',
      },
    },
  },
})
