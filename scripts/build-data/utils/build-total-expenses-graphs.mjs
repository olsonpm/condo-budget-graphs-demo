import { graphDataTypes } from './constants.mjs'

const buildTotalExpensesGraphs = (totalExpensesReport, year) => {
  const graphs = {}
  for (const dataType of graphDataTypes) {
    graphs[dataType] = buildOneGraph(totalExpensesReport, dataType, year)
  }

  return graphs
}

function buildOneGraph(totalExpensesReport, dataType, year) {
  const { buildActual, buildBudget } = getBuildActualAndBudget(dataType)
  const actual = buildActual(totalExpensesReport)
  const budget = buildBudget(totalExpensesReport)

  return {
    data: [
      {
        id: `${year}_total-expenses_actual`,
        data: actual,
      },
      {
        id: `${year}_total-expenses_budget`,
        data: budget,
      },
    ],
  }
}

function getBuildActualAndBudget(dataType) {
  if (dataType === 'runningTotal') {
    return {
      buildActual: makeBuildLine('runningTotal'),
      buildBudget: makeBuildLine('runningBudget'),
    }
  } else {
    // dataType === 'monthlyCost'
    return {
      buildActual: makeBuildLine('monthlyCost'),
      buildBudget: makeBuildLine('monthlyBudget'),
    }
  }
}

function makeBuildLine(key) {
  return data => data.monthly.map(v => ({ x: v.month, y: v[key] }))
}

export default buildTotalExpensesGraphs
