import { mapValues } from '../fp-utils/index.mjs'

export default budgetData => {
  const { budget, ...monthlyData } = budgetData

  const budgetForAllMonths = initBudgetForAllMonths(budget)

  for (const [month, mv] of Object.entries(monthlyData)) {
    const monthName = month.slice(3)
    for (const [category, cv] of Object.entries(mv)) {
      for (const [item, iv] of [
        ...Object.entries(cv.lineItems),
        ['total', cv.total],
      ]) {
        budgetForAllMonths[category][item].monthly.push({
          month: monthName,
          ...iv,
        })
      }
    }
  }

  for (const [category, cv] of Object.entries(budget)) {
    for (const [item, iv] of [
      ...Object.entries(cv.lineItems),
      ['total', cv.total],
    ]) {
      budgetForAllMonths[category][item].budget = iv
    }
  }

  return budgetForAllMonths
}

function initBudgetForAllMonths(budget) {
  return mapValues(({ lineItems }) => {
    const newCategoryVal = mapValues(() => ({ monthly: [], budget: {} }))(
      lineItems
    )

    newCategoryVal.total = { monthly: [], budget: {} }
    return newCategoryVal
  })(budget)
}
