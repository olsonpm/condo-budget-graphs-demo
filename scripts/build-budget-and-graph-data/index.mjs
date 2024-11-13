import path from 'node:path'
import fsp from 'node:fs/promises'
import { dataDir } from './utils/index.mjs'
import buildBudgetAndExpenses from './build-budget-and-expenses.mjs'
import buildReserve from './build-reserve.mjs'
import calculateBudgetAndExpenses from './calculate-budget-and-expenses.mjs'
import buildGraphData from './build-graph-data.mjs'

run()

async function run() {
  try {
    const [budgetAndExpenses, reserve] = await Promise.all([
      buildBudgetAndExpenses(),
      buildReserve(),
    ])
    const calculatedBudgetAndExpenses =
      calculateBudgetAndExpenses(budgetAndExpenses)
    const graphData = buildGraphData(calculatedBudgetAndExpenses, reserve)

    await Promise.all([
      write('budget', budgetAndExpenses),
      write('calculated-budget', calculatedBudgetAndExpenses),
      write('graph', graphData),
      write('reserve', reserve),
    ])

    console.log('donezo !')
  } catch (err) {
    console.error('error building budget json\n', err)
  }
}

function write(fname, data) {
  return fsp.writeFile(
    path.resolve(dataDir, `${fname}.json`),
    JSON.stringify(data, null, 2)
  )
}
