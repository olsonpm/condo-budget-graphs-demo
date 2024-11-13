import {
  buildCategoryItemToColData,
  buildCategoryValues,
} from './utils/index.mjs'

export default sheet => {
  const categoryItemToBudget = buildCategoryItemToColData(sheet, {
    annual: 'H',
  })

  return buildCategoryValues(categoryItemToBudget)
}
