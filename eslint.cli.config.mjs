import cliCfg from '@olsonpm/eslint-config-personal/cli'
import webisteBaseCfg from './eslint.website-base.mjs'
import viteConfig from './vite.app.config.mjs'

export default [
  ...cliCfg,
  ...webisteBaseCfg,
  {
    settings: {
      'import/resolver': {
        node: true,
        vite: { viteConfig },
      },
    },
  },
]
