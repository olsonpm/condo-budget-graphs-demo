import {
  buildLineItemToTotal,
  orderCategoriesAndLineItems,
} from './utils/index.mjs'

const getValuesPerCategory = ({ meta, monthId, sheet, year }) => {
  const metaForYear = meta.byYear[year]
  const lineItemToTotal = buildLineItemToTotal({
    meta,
    monthId,
    sheet,
    year,
  })

  return orderCategoriesAndLineItems(
    lineItemToTotal,
    metaForYear.lineItems.byCategory
  )
}

export default getValuesPerCategory
