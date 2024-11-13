import fsp from 'node:fs/promises'
import path from 'node:path'
import mount from 'koa-mount'
import Router from '@koa/router'
import koaStatic from 'koa-static'
import getCfg from './get-cfg.mjs'

export default async () => {
  const loginDir = path.resolve(import.meta.dirname, 'login')

  const [loginHtml, favicon] = await Promise.all([
    fsp.readFile(path.resolve(loginDir, 'index.html'), 'utf8'),
    fsp.readFile(path.resolve(loginDir, 'favicon.png')),
  ])

  const insecureRouter = new Router()

  insecureRouter.get('/login/index.html', ctx => {
    ctx.status = 404
  })

  insecureRouter.get('/login', ctx => {
    if (ctx.session.isAuthenticated) {
      ctx.redirect('/')
      return
    }

    ctx.body = loginHtml
  })

  insecureRouter.get('/favicon.png', ctx => {
    ctx.type = 'image/png'
    ctx.body = favicon
  })

  insecureRouter.post('/api/login', async ctx => {
    const { username, password } = ctx.request.body
    ctx.status = 400
    ctx.body = { errorMessage: 'Incorrect credentials' }
    const cfg = await getCfg()

    if (
      username &&
      password &&
      password === cfg.users[username.toLowerCase()]
    ) {
      ctx.session.isAuthenticated = true
      ctx.session.username = username.toLowerCase()
      ctx.status = 200
      ctx.body = { message: 'success' }
    }
  })

  insecureRouter.post('/api/logout', ctx => {
    ctx.session = null
    ctx.status = 200
  })

  const insecureAssets = mount('/login', koaStatic(loginDir))

  return { insecureRouter, insecureAssets }
}
