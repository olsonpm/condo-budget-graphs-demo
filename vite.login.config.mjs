import { buildConfig } from './vite.common.config.mjs'

export default buildConfig({
  base: '/login',
  build: {
    outDir: 'dist/login',
    rollupOptions: {
      input: {
        index: 'login.html',
      },
    },
  },
})
