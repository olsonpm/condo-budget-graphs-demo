import {
  buildReserveGraph,
  buildSingleGraph,
  transformToBudgetForAllMonths,
} from './utils/index.mjs'

const allDataTypes = ['runningTotal', 'monthlyCost']

export default (budgetData, reserveData) => {
  const budgetForAllMonths = transformToBudgetForAllMonths(budgetData)
  const graphData = {}

  for (const [category, cv] of Object.entries(budgetForAllMonths)) {
    graphData[category] = {}

    for (const [item, relevantBudgetData] of Object.entries(cv)) {
      graphData[category][item] = {}

      for (const dataType of allDataTypes) {
        graphData[category][item][dataType] = buildSingleGraph(
          relevantBudgetData,
          dataType,
          `${category}_${item}_${dataType}`
        )
      }
    }
  }

  graphData.Reserve = buildReserveGraph(reserveData)

  return graphData
}
