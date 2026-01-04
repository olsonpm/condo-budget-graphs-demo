import { mapValues, omit, pPassThrough, update } from 'common-fp'
import buildMonths from './build-months.mjs'
import buildLineItemsForMonthDemo from './build-line-items-for-month-demo.mjs'
import merge from './merge.mjs'

const buildLineItemsForYearDemo = async year => {
  const lineItemsByMonth = await pPassThrough(year, [
    buildMonths,
    mapValues(buildLineItemsForMonthDemo),
    merge,
    removeNumProps,
  ])

  return lineItemsByMonth
}

/**
 * these are unnecessary with demo data as we're generating expenses rather than
 * referencing them by line item number
 */
function removeNumProps(lineItemsByMonth) {
  return update({
    all: omit(['idByNum', 'categoryByNum']),
  })(lineItemsByMonth)
}

export default buildLineItemsForYearDemo
