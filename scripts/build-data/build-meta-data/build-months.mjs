import path from 'node:path'
import fsp from 'node:fs/promises'
import { discardWhen, mapValues, passThrough, pick } from 'common-fp'
import { dir, isDemo, isHiddenFile, removeExt } from '../../utils.mjs'
import { monthIdToName } from '#shared'

const pickFrom = obj => keys => pick(keys)(obj)

const buildMonths = async year => {
  if (isDemo) return monthIdToName
  const yearDir = path.resolve(dir.dataSrc, `spreadsheets/${year}`)
  const dirFiles = await fsp.readdir(yearDir)
  const months = passThrough(dirFiles, [
    discardWhen(isHiddenFile),
    mapValues(removeExt),
    pickFrom(monthIdToName),
  ])

  return months
}

export default buildMonths
