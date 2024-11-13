import fsp from 'node:fs/promises'
import path from 'node:path'
import { read as xlsxRead } from 'xlsx'
import dataDir from './data-dir.mjs'
import {
  mapValues,
  passThroughAsync,
  reduce,
  resolveValues,
} from '../fp-utils/index.mjs'

const spreadsheetDir = path.resolve(dataDir, 'spreadsheets')

export default async sheetName => {
  const spreadsheetPaths = (await fsp.readdir(spreadsheetDir))
    .filter(n => n.endsWith('.xlsx'))
    .map(fname => path.resolve(spreadsheetDir, fname))

  return passThroughAsync(spreadsheetPaths, [
    reduce((res, fpath) => {
      res[path.basename(fpath, '.xlsx')] = fpath
      return res
    }, {}),
    mapValues(fpath => fsp.readFile(fpath)),
    resolveValues,
    mapValues(content => xlsxRead(content, { sheets: sheetName })),
    mapValues(worksheet => worksheet.Sheets[sheetName]),
  ])
}
