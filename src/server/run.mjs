import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import RedisStore from 'koa2-session-ioredis'
import toMilliseconds from 'to-milliseconds'
import buildInsecureRouter from './build-insecure-router.mjs'
import buildSecureRouter from './build-secure-router.mjs'
import getCfg from './get-cfg.mjs'

run()

async function run() {
  try {
    const cfg = await getCfg()
    const app = new Koa()
    app.keys = [cfg.serverSecret]

    const [{ insecureAssets, insecureRouter }, { secureAssets, secureRouter }] =
      await Promise.all([buildInsecureRouter(app), buildSecureRouter(app)])

    const sessionOpts = {
      maxAge: toMilliseconds.fromDays(60),
      rolling: true,
      store: new RedisStore({ host: 'redis' }),
    }
    app
      .use(bodyParser())
      .use(session(sessionOpts, app))
      .use(insecureRouter.routes())
      .use(insecureRouter.allowedMethods())
      .use(insecureAssets)
      .use(secureRouter.routes())
      .use(secureRouter.allowedMethods())
      .use(secureAssets)

    app.listen(2663, () => {
      console.log('listening on port 2663')
    })
  } catch (err) {
    console.error('top level err\n', err)
  }
}
