import path from 'node:path'
import fsp from 'node:fs/promises'
import { makeDirectory } from 'make-dir'
import { getAllYears } from './utils/index.mjs'
import buildAppReadyData from './build-app-ready-data.mjs'
import buildReport from './build-report.mjs'
import buildReportDemo from './build-report-demo.mjs'
import buildReserve from './build-reserve.mjs'
import buildReserveDemoByYear from './build-reserve-demo-by-year.mjs'
import calculateReport from './calculate-report/index.mjs'
import buildGraphData from './build-graph-data.mjs'
import buildMetaData from './build-meta-data/index.mjs'
import buildRootData from './build-root-data.mjs'
import { cleanDirectory, dir, isDemo } from '../utils.mjs'
import { assertAllEntriesWereIgnored } from './services/entries-to-ignore/index.mjs'

run()

async function run() {
  try {
    await cleanDirectory(dir.dataBuilt)
    const meta = await buildMetaData()

    const allYears = await getAllYears()
    let reserveDemoByYear
    if (isDemo) {
      reserveDemoByYear = buildReserveDemoByYear({
        allYears,
        meta,
      })
    }
    for (const year of allYears) {
      const builtAnnualDir = path.resolve(dir.dataBuilt, `annual/${year}`)
      await makeDirectory(builtAnnualDir)

      const buildReportFn = isDemo ? buildReportDemo : buildReport

      const [report, reserve] = await Promise.all([
        buildReportFn({ meta, year }),
        isDemo ? reserveDemoByYear[year] : buildReserve(year),
      ])

      const calculatedReport = calculateReport({ meta, report, year })
      const graphData = buildGraphData(calculatedReport, reserve, year)

      const write = makeWrite(builtAnnualDir)
      await Promise.all([
        write('report', report),
        write('calculated-report', calculatedReport),
        write('graph', graphData),
        write('reserve', reserve),
      ])
    }

    if (!isDemo) assertAllEntriesWereIgnored()
    await buildRootData()
    await buildAppReadyData()
    console.log('donezo !')
  } catch (err) {
    console.error('error building budget json\n', err)
  }
}

function makeWrite(builtAnnualDir) {
  return (fname, data) =>
    fsp.writeFile(
      path.resolve(builtAnnualDir, `${fname}.json`),
      JSON.stringify(data, null, 2)
    )
}
