import categories from '../../../data/categories/data.mjs'
import { mapValues } from '../fp-utils/index.mjs'

export default categoryItemToValue => {
  return mapValues(categoryLineItems => {
    const lineItems = categoryLineItems.reduce((res, lineItem) => {
      res[lineItem] = categoryItemToValue[lineItem]
      return res
    }, {})

    return { lineItems }
  })(categories)
}
