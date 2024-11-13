import buildReserve from './build-budget-and-graph-data/build-reserve.mjs'

run()

async function run() {
  try {
    const reserveByMonth = await buildReserve()
    console.log(JSON.stringify(reserveByMonth, null, 2))
  } catch (err) {
    console.error('top level error\n', err)
  }
}
