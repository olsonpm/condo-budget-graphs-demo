import { filter, passThrough, pickFrom, sort } from '../fp-utils/index.mjs'

const getCol = (letter, sheet) =>
  passThrough(sheet, [
    Object.keys,
    filter(k => k.startsWith(letter)),
    sort(byCellRow),
    pickFrom(sheet),
  ])

function byCellRow(l, r) {
  const ln = Number(l.slice(1))
  const rn = Number(r.slice(1))
  return ln - rn
}

export default getCol
