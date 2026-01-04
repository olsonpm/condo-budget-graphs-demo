import fsp from 'node:fs/promises'
import path from 'node:path'
import { dir, isDemo } from '../../utils.mjs'

const spreadsheetsDir = path.resolve(dir.dataSrc, 'spreadsheets')
let allYears

const getAllYears = async () => {
  if (isDemo) return ['2024', '2025']
  try {
    allYears ??= fsp.readdir(spreadsheetsDir)
    return allYears
  } catch (err) {
    return Promise.reject(err)
  }
}

export default getAllYears
