import { alter, invert, mapValues, passThrough } from 'common-fp'
import getCol from './get-col.mjs'
import roundToCent from './round-to-cent.mjs'

const buildLineItemToAnnualBudget = ({ allLineItems, sheet }) => {
  const colA = getCol('A', sheet)
  const valToCell = passThrough(colA, [mapValues(c => c.v), invert])
  const toCellByLineItem = (res, lineItem) => {
    res[lineItem] = valToCell[lineItem]
    return res
  }

  return passThrough(allLineItems, [
    alter(toCellByLineItem, () => ({})),
    mapValues(cell => {
      if (!cell) return 0
      const rowNum = cell.slice(1)
      return roundToCent(sheet[`H${rowNum}`].v)
    }),
  ])
}

export default buildLineItemToAnnualBudget
