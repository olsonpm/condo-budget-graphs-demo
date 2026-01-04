import { mapValues } from 'common-fp'
import { buildSheetByMonth, constants } from './utils/index.mjs'
import getValuesPerCategory from './get-values-per-category.mjs'
import getBudgetPerCategory from './get-budget-per-category.mjs'

const buildReport = async ({ meta, year }) => {
  const sheetByMonth = await buildSheetByMonth({
    sheetName: constants.worksheetName.accountsPayable,
    year,
  })
  const categoryExpensesByMonth = mapValues((sheet, monthId) =>
    getValuesPerCategory({ meta, monthId, sheet, year })
  )(sheetByMonth)

  const budget = await getBudgetPerCategory({ meta, year })

  return {
    ...categoryExpensesByMonth,
    budget,
  }
}

export default buildReport
