import { mapValues } from 'common-fp'

const orderCategoriesAndLineItems = (
  categoryItemToValue,
  lineItemsByCategory
) => {
  return mapValues(catLineItems => {
    const lineItemValues = catLineItems.reduce((res, lineItem) => {
      res[lineItem] = categoryItemToValue[lineItem]
      return res
    }, {})

    return lineItemValues
  })(lineItemsByCategory)
}

export default orderCategoriesAndLineItems
