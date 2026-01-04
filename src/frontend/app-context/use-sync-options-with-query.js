import { useEffect } from 'react'
import { isLaden } from 'common-fp'
import { parsedQuery, queryString } from '@/utils'

const { highlightMonth } = parsedQuery

const useSyncOptionsWithQuery = dependencies => {
  const { year, category, item, dataType, compareYears } = dependencies

  useEffect(() => {
    const queryObj = getQueryObj({
      year,
      category,
      item,
      dataType,
      compareYears,
    })
    if (highlightMonth) queryObj.highlightMonth = highlightMonth

    const curQuery = isLaden(queryObj) ? queryString.stringify(queryObj) : ''
    const curPath = curQuery
      ? location.pathname + '?' + curQuery
      : location.pathname

    history.replaceState(null, '', curPath)
  }, [year, category, item, dataType, compareYears])
}

function getQueryObj({ year, category, item, dataType, compareYears }) {
  const queryObj = {}

  if (year) queryObj.year = year
  else return {}

  if (category) queryObj.category = category
  else return queryObj

  if (category === 'Reserved') return queryObj
  else if (category !== 'Total Expenses') {
    if (item) queryObj.item = item
    else return queryObj
  }

  if (dataType) queryObj.dataType = dataType
  else return queryObj

  if (isLaden(compareYears)) queryObj.compareYears = compareYears
  return queryObj
}

export default useSyncOptionsWithQuery
