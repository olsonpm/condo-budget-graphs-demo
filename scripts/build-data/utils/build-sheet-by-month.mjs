import fsp from 'node:fs/promises'
import path from 'node:path'
import { alter, mapValues, pPassThrough, pResolveValues } from 'common-fp'
import { read as xlsxRead } from 'xlsx'
import { dir } from '../../utils.mjs'

export default async ({ sheetName, year }) => {
  const spreadsheetDir = path.resolve(dir.dataSrc, `spreadsheets/${year}`)
  const makeEmptyObj = () => ({})
  const spreadsheetPaths = (await fsp.readdir(spreadsheetDir))
    .filter(n => n.endsWith('.xlsx'))
    .map(fname => path.resolve(spreadsheetDir, fname))

  return pPassThrough(spreadsheetPaths, [
    alter((res, fpath) => {
      res[path.basename(fpath, '.xlsx')] = fpath
      return res
    }, makeEmptyObj),
    mapValues(fpath => fsp.readFile(fpath)),
    pResolveValues,
    mapValues(content => xlsxRead(content, { sheets: sheetName })),
    mapValues(worksheet => worksheet.Sheets[sheetName]),
  ])
}
