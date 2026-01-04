import { capitalCase } from 'change-case'

const buildLineItemsForMonth = sheet => {
  const byCategory = {}

  let row = 0
  let cell
  let expensesFound

  do {
    row += 1
    cell = sheet[`A${row}`]
    expensesFound = cell?.v === 'EXPENSES'
  } while (!expensesFound)

  let expensesEnded
  let prevCell = cell
  row += 1
  cell = sheet[`A${row}`]
  let curCategory
  const hasNoNumbers = str => !/\d/.test(str)
  do {
    if ((!prevCell || prevCell.v === 'EXPENSES') && hasNoNumbers(cell.v)) {
      curCategory = capitalCase(cell.v)
      byCategory[curCategory] = []
    } else if (!cell) {
      curCategory = undefined
    } else if (curCategory) {
      byCategory[curCategory].push(cell.v)
    }

    prevCell = cell
    row += 1
    cell = sheet[`A${row}`]

    expensesEnded = cell?.v === 'RESTRICTED TRANSFERS TO RESERVES'
  } while (!expensesEnded)

  return {
    all: Object.values(byCategory).flat(),
    byCategory,
  }
}

export default buildLineItemsForMonth
