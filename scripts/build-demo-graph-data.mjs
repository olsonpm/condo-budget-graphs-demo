import fsp from 'node:fs/promises'
import path from 'node:path'
import { dir } from './utils.mjs'
import calculateReport from './build-data/calculate-report.mjs'
import buildGraphData from './build-data/build-graph-data.mjs'

run()

async function run() {
  try {
    const demoBudget = await getDemoBudgetData()
    const calculatedBudgetAndExpenses = calculateReport(demoBudget)
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
    await fsp.readFile(path.resolve(dir.dataBuilt, 'demo-budget.json'))
  )
}

function write(fname, data) {
  return fsp.writeFile(
    path.resolve(dir.dataBuilt, `${fname}.json`),
    JSON.stringify(data, null, 2)
  )
}
