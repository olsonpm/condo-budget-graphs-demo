import { mapValues } from 'common-fp'
import { buildSheetByMonth, constants } from '../utils/index.mjs'
import buildLineItemsForMonth from './build-line-items-for-month.mjs'
import merge from './merge.mjs'

const buildLineItemsForYear = async year => {
  const sheetByMonth = await buildSheetByMonth({
    sheetName: constants.worksheetName.budget,
    year,
  })

  const lineItemsByMonth = mapValues(buildLineItemsForMonth)(sheetByMonth)

  return merge(lineItemsByMonth)
}

export default buildLineItemsForYear
