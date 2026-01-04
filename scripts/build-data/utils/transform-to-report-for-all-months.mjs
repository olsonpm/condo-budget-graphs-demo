import { assignOverrides, mapValues, passThrough } from 'common-fp'

export default report => {
  const { budget, ...expenses } = report
  const { ['Total Expenses']: totalBudget, ...categoryBudget } = budget
  const reportForAllMonths = initReportForAllMonths(categoryBudget)

  for (const [month, mv] of Object.entries(expenses)) {
    const monthName = month.slice(3)
    const { ['Total Expenses']: total, ...categoryExpenses } = mv
    for (const [category, cv] of Object.entries(categoryExpenses)) {
      for (const [item, iv] of [
        ...Object.entries(cv.lineItems),
        ['total', cv.total],
      ]) {
        reportForAllMonths[category][item].monthly.push({
          month: monthName,
          ...iv,
        })
      }
    }
    reportForAllMonths['Total Expenses'].monthly.push({
      month: monthName,
      ...total,
    })
  }

  for (const [category, cv] of Object.entries(categoryBudget)) {
    for (const [item, iv] of [
      ...Object.entries(cv.lineItems),
      ['total', cv.total],
    ]) {
      reportForAllMonths[category][item].budget = iv
    }
  }
  reportForAllMonths['Total Expenses'].budget = totalBudget

  return reportForAllMonths
}

function initReportForAllMonths(budget) {
  return passThrough(budget, [
    mapValues(({ lineItems }) => {
      const newCategoryVal = mapValues(() => ({ monthly: [], budget: {} }))(
        lineItems
      )

      newCategoryVal.total = { monthly: [], budget: {} }
      return newCategoryVal
    }),
    assignOverrides({
      ['Total Expenses']: {
        monthly: [],
        budget: {},
      },
    }),
  ])
}
