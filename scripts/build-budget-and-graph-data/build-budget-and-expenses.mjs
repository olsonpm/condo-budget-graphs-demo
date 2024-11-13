import { buildSheetByMonth } from './utils/index.mjs'
import getValuesPerCategory from './get-values-per-category.mjs'
import getBudgetPerCategory from './get-budget-per-category.mjs'
import { mapValues } from './fp-utils/index.mjs'

export default async () => {
  const comparisonSheetByMonth = await buildSheetByMonth(
    'Revenue & Expense Budget Compar'
  )
  const categoryExpensesByMonth = mapValues(getValuesPerCategory)(
    comparisonSheetByMonth
  )
  return {
    ...categoryExpensesByMonth,
    budget: getBudgetPerCategory(comparisonSheetByMonth['01-jan']),
  }
}
