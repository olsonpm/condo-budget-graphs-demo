import { mapValues } from 'common-fp'
import { buildSheetByMonth, getCol, roundToCent } from './utils/index.mjs'

const buildReserve = async year => {
  const ledgerSheetByMonth = await buildSheetByMonth({
    sheetName: 'General Ledger',
    year,
  })
  return mapValues(getReserve)(ledgerSheetByMonth)
}

function getReserve(sheet) {
  const colA = getCol('A', sheet)
  const reservesRow = getReservesRow(colA)
  const endingBalanceRow = getEndingBalanceRow(sheet, reservesRow)
  return roundToCent(sheet[`H${endingBalanceRow}`].v)
}

function getReservesRow(colA) {
  const [cell] = Object.entries(colA).find(([_k, v]) => v.v === '1065')
  return Number(cell.slice(1))
}

function getEndingBalanceRow(sheet, reservesRow) {
  for (const [cell, data] of Object.entries(getCol('C', sheet))) {
    const row = Number(cell.slice(1))
    if (row < reservesRow || data.v !== 'Ending Balance') continue

    return row
  }
}

export default buildReserve
