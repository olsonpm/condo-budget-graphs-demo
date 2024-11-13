import fsp from 'node:fs/promises'
import path from 'node:path'
import compose from 'koa-compose'
import Router from '@koa/router'
import koaStatic from 'koa-static'

export default async () => {
  const appDir = path.resolve(import.meta.dirname, 'app')
  const appHtml = await fsp.readFile(path.resolve(appDir, 'index.html'), 'utf8')
  const secureRouter = new Router()

  secureRouter.get('/index.html', ctx => {
    ctx.status = 404
  })

  secureRouter.get('/', ctx => {
    if (!ctx.session.isAuthenticated) {
      ctx.redirect('/login')
    } else {
      ctx.response.body = appHtml
    }
  })

  const secureAssets = compose([
    async (ctx, next) => {
      if (!ctx.session.isAuthenticated) {
        ctx.status = 401
      } else {
        await next()
      }
    },
    koaStatic(appDir),
  ])

  return { secureRouter, secureAssets }
}
