import { mapValues, omit } from 'common-fp'
import calculateBudgetTotals from './calculate-budget-totals.mjs'
import calculateCategoryReport from './calculate-category-report.mjs'
import { roundToCent } from '../utils/index.mjs'

const calculateReport = ({ meta, report, year }) => {
  const metaForYear = meta.byYear[year]
  const budget = calculateBudgetTotals(report.budget)
  const runningValues = initRunningValues(metaForYear)
  const monthlyReport = {}
  const roundTotal = mapValues(roundToCent)

  const expenses = omit(['budget'])(report)
  for (const [monthId, mv] of Object.entries(expenses)) {
    monthlyReport[monthId] = {}

    const total = {
      monthlyCost: 0,
      monthlyBudget: 0,
      runningTotal: 0,
      runningBudget: 0,
    }
    const addToTotal = makeAddToTotal(total)

    for (const [category, lineItemValues] of Object.entries(mv)) {
      const categoryRunningValues = runningValues[category]
      const categoryReport = calculateCategoryReport({
        lineItemValues,
        categoryRunningValues,
        budget,
        year,
        category,
        monthId,
      })
      addToTotal(categoryReport)
      monthlyReport[monthId][category] = categoryReport
    }

    monthlyReport[monthId]['Total Expenses'] = roundTotal(total)
  }

  return {
    ...monthlyReport,
    budget,
  }
}

function initRunningValues(metaForYear) {
  const initVal = {
    runningTotal: 0,
    runningBudget: 0,
  }
  return mapValues(lineItems => ({
    lineItems: lineItems.reduce((res, li) => {
      res[li] = { ...initVal }
      return res
    }, {}),
    total: { ...initVal },
  }))(metaForYear.lineItems.byCategory)
}

// mutates total
function makeAddToTotal(total) {
  return function addToTotal(expense) {
    total.monthlyCost += expense.total.monthlyCost
    total.monthlyBudget += expense.total.monthlyBudget
    total.runningTotal += expense.total.runningTotal
    total.runningBudget += expense.total.runningBudget
  }
}

export default calculateReport
