import fsp from 'node:fs/promises'
import path from 'node:path'
import { deleteAsync } from 'del'
import buildLineItemsForYear from './build-line-items-for-year.mjs'
import buildLineItemsForYearDemo from './build-line-items-for-year-demo.mjs'
import buildMonths from './build-months.mjs'
import { getAllYears } from '../utils/index.mjs'
import { dir, isDemo } from '../../utils.mjs'

const buildMetaData = async () => {
  const fname = 'meta.json'
  const buildLineItemsFn = isDemo
    ? buildLineItemsForYearDemo
    : buildLineItemsForYear

  const metaFPath = path.resolve(dir.dataBuilt, fname)

  await deleteAsync(metaFPath)

  const meta = { byYear: {} }

  for (const year of await getAllYears()) {
    meta.byYear[year] = {}
    const curYearMeta = meta.byYear[year]

    const [lineItems, months] = await Promise.all([
      buildLineItemsFn(year),
      buildMonths(year),
    ])

    Object.assign(curYearMeta, { lineItems, months })
  }

  await fsp.writeFile(metaFPath, JSON.stringify(meta, null, 2))

  return meta
}

export default buildMetaData
