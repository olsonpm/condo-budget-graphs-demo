import {
  compareByProp,
  mapKeys,
  mapValues,
  passThrough,
  pick,
  swapFirstTwoArgs as byKey,
  withNumbersDescending,
} from 'common-fp'
import getCol from './get-col.mjs'
import roundToCent from './round-to-cent.mjs'
import { shouldIgnoreEntry } from '../services/entries-to-ignore/index.mjs'

const idRe = /^\d+/

const buildLineItemToTotal = ({ meta, monthId, sheet, year }) => {
  const metaForYear = meta.byYear[year]
  const categoryByLineItemNum = metaForYear.lineItems.all.categoryByNum
  const lineItemByNum = metaForYear.lineItems.all.idByNum
  const allLineItemNums = Object.keys(lineItemByNum)
  const colA = getCol('A', sheet)
  const valToCells = passThrough(colA, [mapValues(c => c.v), invertWithArr])
  const expenseCells = allLineItemNums.map(n => `${n}- 0`)
  const expenseCellToLineItem = expenseCell => {
    const num = expenseCell.match(idRe)[0]
    return lineItemByNum[num]
  }
  const byAmountDesc = compareByProp('amount', withNumbersDescending)

  return passThrough(valToCells, [
    pick(expenseCells),
    mapValues(cells => {
      let monthlyCost = 0
      const entries = []
      for (const c of cells) {
        const rowNum = c.slice(1)
        const entry = getEntry(sheet, rowNum)
        const lineItemNum = getLineItemNum(sheet[`A${rowNum}`].v)
        const category = categoryByLineItemNum[lineItemNum]
        const lineItem = lineItemByNum[lineItemNum]
        const argObj = { year, monthId, category, lineItem, ...entry }
        if (shouldIgnoreEntry(argObj)) continue
        entries.push(entry)
        monthlyCost += entry.amount
      }
      entries.sort(byAmountDesc)
      return {
        monthlyCost: roundToCent(monthlyCost),
        entries,
      }
    }),
    mapKeys(byKey(expenseCellToLineItem)),
  ])
}

function invertWithArr(obj) {
  const res = {}
  for (const [k, v] of Object.entries(obj)) {
    res[v] ??= []
    res[v].push(k)
  }
  return res
}

function getLineItemNum(colAVal) {
  return colAVal.split('-')[0]
}

function getEntry(sheet, rowNum) {
  const propToCol = {
    amount: 'H',
    description: 'I',
    entryDate: 'G',
    invoiceDate: 'F',
    invoiceID: 'E',
    vendorID: 'B',
    vendorName: 'C',
    voucherNumber: 'D',
  }

  return mapValues(col => sheet[`${col}${rowNum}`].v)(propToCol)
}

export default buildLineItemToTotal
