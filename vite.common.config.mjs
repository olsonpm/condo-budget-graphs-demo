import path from 'node:path'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

const fromRoot = fpath => path.resolve(import.meta.dirname, fpath)

const buildConfig = (cfg = {}) => {
  const ro = cfg.build?.rollupOptions || {}

  return defineConfig({
    ...cfg,
    server: {
      ...(cfg.server || {}),
      port: 2663,
    },
    plugins: [react(), mkcert(), ...(cfg.plugins || [])],
    build: {
      ...(cfg.build || {}),
      rollupOptions: {
        ...ro,
        input: {
          ...(ro.input || {}),
        },
      },
    },
    resolve: {
      ...(cfg.resolve || {}),
      alias: {
        '@': fromRoot('src/frontend'),
        '@data': fromRoot('data/app-ready'),
        '@shared': fromRoot('shared/index.mjs'),
        ...(cfg.resolve?.alias || {}),
      },
    },
  })
}

export { buildConfig }
