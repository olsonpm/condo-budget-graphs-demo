import path from 'node:path'
import styleVars from './src/frontend/utils/style-vars.js'

export default {
  plugins: {
    'postcss-mixins': {
      mixinsDir: path.resolve(
        import.meta.dirname,
        'src/frontend/styles/mixins'
      ),
    },
    'postcss-simple-vars': { variables: styleVars },
    'postcss-nested': {},
    'postcss-merge-rules': {},
  },
}
