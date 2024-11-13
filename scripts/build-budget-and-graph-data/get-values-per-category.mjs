import {
  buildCategoryItemToColData,
  buildCategoryValues,
} from './utils/index.mjs'

export default sheet => {
  const categoryItemToMonthVal = buildCategoryItemToColData(sheet, {
    monthlyCost: 'B',
  })

  return buildCategoryValues(categoryItemToMonthVal)
}
