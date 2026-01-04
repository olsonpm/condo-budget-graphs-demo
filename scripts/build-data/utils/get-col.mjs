import { keepWhen, order, passThrough, pick, startsWith } from 'common-fp'

const getCol = (letter, sheet) =>
  passThrough(sheet, [
    Object.keys,
    keepWhen(startsWith(letter)),
    order(byCellRow),
    cells => pick(cells)(sheet),
  ])

function byCellRow(l, r) {
  const ln = Number(l.slice(1))
  const rn = Number(r.slice(1))
  return ln - rn
}

export default getCol
