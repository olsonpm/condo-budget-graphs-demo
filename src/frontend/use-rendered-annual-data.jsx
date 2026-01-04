import { useContext, useEffect, useRef, useState } from 'react'
import deepEql from 'deep-eql'
import {
  alter,
  appendAll,
  getAtPath,
  keepFirst,
  keepWhen,
  mapValues,
  passThrough,
  pWaitMs,
  update,
  withStringsAscending,
} from 'common-fp'
import { AnnualData } from '@/cmpt'
import { graphDataByYear } from '@/data'
import { AppCtx } from '@/app-context'
import { isFullySelected } from '@/app-context/utils'

const useRenderedAnnualData = () => {
  const {
    activeLines,
    availableLines,
    hasCompareYears,
    year,
    category,
    item,
    dataType,
    compareYears,
    setActiveLines,
    setAvailableLines,
  } = useContext(AppCtx)
  const [renderedAnnualData, setRenderedAnnualData] = useState()
  const renderedAnnualDataState = useRef({})

  const performTransition = async updatedData => {
    setRenderedAnnualData()
    await pWaitMs(400)
    setRenderedAnnualData(updatedData)
  }

  useEffect(() => {
    if (!isFullySelected({ year, category, item, dataType })) return
    const rendered = {
      item,
      dataType,
    }

    const {
      curAnnualDataId: prevAnnualDataId,
      prevCompareYears,
      prevActiveLines,
      prevAvailableLines,
    } = renderedAnnualDataState.current

    let graphId
    if (category === 'Reserve') {
      graphId = `${year}_Reserve`
      delete rendered.item
      delete rendered.dataType
    } else if (category === 'Total Expenses') {
      graphId = `${year}_${category}_${dataType}`
      delete rendered.item
    } else {
      graphId = `${year}_${category}_${item}_${dataType}`
    }

    let pathToLineProps
    if (category === 'Reserve') {
      pathToLineProps = ['Reserve']
    } else if (category === 'Total Expenses') {
      pathToLineProps = [category, dataType]
    } else {
      pathToLineProps = [category, item, dataType]
    }

    let curActiveLines = activeLines
    let curAvailableLines = availableLines

    const compareYearsAreEql = deepEql(prevCompareYears, compareYears)
    const isDuplicateRender =
      graphId === prevAnnualDataId &&
      deepEql(curActiveLines, prevActiveLines) &&
      deepEql(curAvailableLines, prevAvailableLines) &&
      compareYearsAreEql

    if (isDuplicateRender) return
    else if (graphId !== prevAnnualDataId || !compareYearsAreEql) {
      const years = [year, ...compareYears]
      const lines = years
        .map(y => {
          const getLineProps = getAtPath([y, ...pathToLineProps])
          const lineProps = getLineProps(graphDataByYear)
          const lineTypes = lineProps.data.map(({ id }) => id.split('_').pop())

          return lineTypes.map(lt => ({ year: y, lineType: lt }))
        })
        .flat()
      setAvailableLines(lines)
      setActiveLines(lines)
      curActiveLines = lines
      curAvailableLines = lines
    }

    const lineProps = getActiveLineProps(
      year,
      compareYears,
      pathToLineProps,
      curActiveLines
    )
    const activeYears = [year, ...compareYears].sort(withStringsAscending)

    const updatedAnnualData = (
      <AnnualData
        activeLines={curActiveLines}
        activeYears={activeYears}
        availableLines={curAvailableLines}
        category={category}
        graphType={hasCompareYears ? 'compare' : 'simple'}
        lineItem={rendered.item}
        lineProps={lineProps}
        setActiveLines={setActiveLines}
      />
    )
    renderedAnnualDataState.current = {
      prevAnnualDataId,
      curAnnualDataId: graphId,
      prevCompareYears: compareYears,
      prevActiveLines: curActiveLines,
      prevAvailableLines: curAvailableLines,
    }

    if (!prevAnnualDataId || prevAnnualDataId === graphId)
      setRenderedAnnualData(updatedAnnualData)
    else performTransition(updatedAnnualData)
  }, [
    activeLines,
    availableLines,
    hasCompareYears,
    year,
    category,
    item,
    dataType,
    compareYears,
    setActiveLines,
    setAvailableLines,
  ])

  return renderedAnnualData
}

function getActiveLineProps(year, compareYears, path, curActiveLines) {
  const baseLineProps = getAtPath(path)(graphDataByYear[year])
  const mergeLineProps = alter(
    (result, lineProps) => {
      return update({
        data: appendAll(lineProps.data),
      })(result)
    },
    () => baseLineProps
  )

  const keepBaseMonthsOfData = keepFirst(baseLineProps.data[0].data.length)
  const matchMonthsWithBase = update({
    data: mapValues(datum => ({
      ...datum,
      data: keepBaseMonthsOfData(datum.data),
    })),
  })
  const isActive = ({ id }) =>
    curActiveLines.some(
      ({ lineType, year }) => id.startsWith(year) && id.endsWith(lineType)
    )
  const keepActive = update({
    data: keepWhen(isActive),
  })
  return passThrough(compareYears, [
    mapValues(y => getAtPath(path)(graphDataByYear[y])),
    mapValues(matchMonthsWithBase),
    mergeLineProps,
    keepActive,
  ])
}

export default useRenderedAnnualData
