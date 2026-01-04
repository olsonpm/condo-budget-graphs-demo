import { mapValues } from 'common-fp'
import { demoData } from './utils/index.mjs'

const { lineItemData, lineItemsByCategory } = demoData

const getBudgetPerCategory = () => {
  return mapValues(lineItems => {
    return lineItems.reduce((res, item) => {
      res[item] = lineItemData[item].budget
      return res
    }, {})
  })(lineItemsByCategory)
}

export default getBudgetPerCategory
