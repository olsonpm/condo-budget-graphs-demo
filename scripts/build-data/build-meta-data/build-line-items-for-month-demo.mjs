import { demoData } from '../utils/index.mjs'

const buildLineItemsForMonthDemo = _unusedMonthId => {
  return {
    all: Object.values(demoData.lineItemsByCategory).flat(),
    byCategory: demoData.lineItemsByCategory,
  }
}

export default buildLineItemsForMonthDemo
