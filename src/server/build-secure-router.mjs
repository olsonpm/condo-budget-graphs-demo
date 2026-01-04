import fsp from 'node:fs/promises'
import path from 'node:path'
import compose from 'koa-compose'
import Router from '@koa/router'
import koaStatic from 'koa-static'

const appDir = path.resolve(import.meta.dirname, 'app')
const readAppFile = fname => fsp.readFile(path.resolve(appDir, fname), 'utf8')

export default async () => {
  const [appHtml, compareHtml, monthHtml] = await Promise.all([
    readAppFile('index.html'),
    readAppFile('compare.html'),
    readAppFile('month.html'),
  ])
  const secureRouter = new Router()

  const buildAuthenticatedRoute = ({ rpath, body }) => {
    secureRouter.get(`${rpath}.html`, ctx => {
      ctx.status = 404
    })

    secureRouter.get(rpath, ctx => {
      if (!ctx.session.isAuthenticated) {
        ctx.redirect('/login')
      } else {
        ctx.response.body = body
      }
    })
  }

  const routes = [
    { rpath: '/compare', body: compareHtml },
    { rpath: '/month', body: monthHtml },
    { rpath: '/', body: appHtml },
  ]
  routes.forEach(buildAuthenticatedRoute)

  secureRouter.get('/index.html', ctx => {
    ctx.status = 404
  })
  secureRouter.get('/compare.html', ctx => {
    ctx.status = 404
  })
  secureRouter.get('/month.html', ctx => {
    ctx.status = 404
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
