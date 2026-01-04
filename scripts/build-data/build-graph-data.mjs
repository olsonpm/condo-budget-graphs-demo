import {
  buildReserveGraph,
  buildSingleGraph,
  buildTotalExpensesGraphs,
  constants,
  transformToReportForAllMonths,
} from './utils/index.mjs'

export default (report, reserveData, year) => {
  const reportForAllMonths = transformToReportForAllMonths(report)
  const { ['Total Expenses']: total, ...categoryExpenses } = reportForAllMonths
  const graphData = {}

  for (const [category, cv] of Object.entries(categoryExpenses)) {
    graphData[category] = {}

    for (const [item, relevantBudgetData] of Object.entries(cv)) {
      graphData[category][item] = {}

      for (const dataType of constants.graphDataTypes) {
        graphData[category][item][dataType] = buildSingleGraph(
          relevantBudgetData,
          dataType,
          `${year}_${category}_${item}_${dataType}`
        )
      }
    }
  }

  graphData['Total Expenses'] = buildTotalExpensesGraphs(total, year)
  graphData.Reserve = buildReserveGraph(reserveData, year)

  return graphData
}
