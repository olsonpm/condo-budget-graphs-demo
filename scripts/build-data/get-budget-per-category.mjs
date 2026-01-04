import {
  buildLineItemToAnnualBudget,
  orderCategoriesAndLineItems,
  buildSheetByMonth,
  constants,
} from './utils/index.mjs'

const getBudgetPerCategory = async ({ meta, year }) => {
  const budgetByMonth = await buildSheetByMonth({
    sheetName: constants.worksheetName.budget,
    year,
  })

  const metaForYear = meta.byYear[year]
  const lineItemToBudget = buildLineItemToAnnualBudget({
    allLineItems: metaForYear.lineItems.all.array,
    sheet: budgetByMonth['01-jan'],
  })

  return orderCategoriesAndLineItems(
    lineItemToBudget,
    metaForYear.lineItems.byCategory
  )
}

export default getBudgetPerCategory
