import fsp from 'node:fs/promises'
import path from 'node:path'
import { dataDir } from './build-budget-and-graph-data/utils/index.mjs'
import calculateBudgetAndExpenses from './build-budget-and-graph-data/calculate-budget-and-expenses.mjs'
import buildGraphData from './build-budget-and-graph-data/build-graph-data.mjs'

run()

async function run() {
  try {
    const demoBudget = await getDemoBudgetData()
    const calculatedBudgetAndExpenses = calculateBudgetAndExpenses(demoBudget)
    const demoGraphData = buildGraphData(calculatedBudgetAndExpenses)

    await Promise.all([
      write('demo-calculated-budget', calculatedBudgetAndExpenses),
      write('demo-graph', demoGraphData),
    ])
    console.log('donezo !')
  } catch (err) {
    console.error('top level error\n', err)
  }
}

async function getDemoBudgetData() {
  return JSON.parse(
    await fsp.readFile(path.resolve(dataDir, 'demo-budget.json'))
  )
}

function write(fname, data) {
  return fsp.writeFile(
    path.resolve(dataDir, `${fname}.json`),
    JSON.stringify(data, null, 2)
  )
}
