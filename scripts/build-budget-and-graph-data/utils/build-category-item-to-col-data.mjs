import { lineItems } from '../../../data/categories/view.mjs'
import { invert, mapValues, passThrough, pick } from '../fp-utils/index.mjs'
import getCol from './get-col.mjs'
import roundToCent from './round-to-cent.mjs'

const buildCategoryItemToColData = (sheet, colNameToLetter) => {
  const colA = getCol('A', sheet)
  const valToCell = passThrough(colA, [mapValues(c => c.v), invert])

  return passThrough(valToCell, [
    pick(lineItems),
    mapValues(cell => {
      const rowNum = cell.slice(1)
      return mapValues(letter => roundToCent(sheet[`${letter}${rowNum}`].v))(
        colNameToLetter
      )
    }),
  ])
}

export default buildCategoryItemToColData
