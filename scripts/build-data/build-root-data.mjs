import { alter, mapValues, pPassThrough, pResolveValues } from 'common-fp'
import path from 'node:path'
import fsp from 'node:fs/promises'
import { dir, readFile } from '../utils.mjs'

const buildRootData = async () => {
  await Promise.all(
    ['graph', 'calculated-report'].map(async datum => {
      const rootDatum = await buildRootDatum(datum)

      return fsp.writeFile(
        path.resolve(dir.dataBuilt, `${datum}.json`),
        JSON.stringify(rootDatum, null, 2)
      )
    })
  )
}

async function buildRootDatum(datum) {
  const annualDir = path.resolve(dir.dataBuilt, 'annual')
  const makeEmtpyObj = () => ({})
  const buildDatumPerYear = (res, year) => {
    res[year] = readFile(path.resolve(annualDir, year, `${datum}.json`))
    return res
  }

  return pPassThrough(annualDir, [
    fsp.readdir,
    alter(buildDatumPerYear, makeEmtpyObj),
    pResolveValues,
    mapValues(val => JSON.parse(val)),
  ])
}

export default buildRootData
