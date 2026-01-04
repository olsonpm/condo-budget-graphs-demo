import getValuesPerCategoryDemo from './get-values-per-category-demo.mjs'
import getBudgetPerCategoryDemo from './get-budget-per-category-demo.mjs'

const buildReportDemo = async ({ meta, year }) => {
  const categoryExpensesByMonth = getValuesPerCategoryDemo({ meta, year })

  return {
    ...categoryExpensesByMonth,
    budget: getBudgetPerCategoryDemo(),
  }
}

export default buildReportDemo
