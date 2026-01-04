import { useEffect } from 'react'
import { isLaden } from 'common-fp'
import { queryString } from '@/utils'

const useSyncWithQuery = ({ monthName, year }) => {
  useEffect(() => {
    const queryObj = getQueryObj({
      monthName,
      year,
    })
    const curQuery = isLaden(queryObj) ? queryString.stringify(queryObj) : ''
    const curPath = curQuery
      ? location.pathname + '?' + curQuery
      : location.pathname

    history.replaceState(null, '', curPath)
  }, [monthName, year])
}

function getQueryObj({ monthName, year }) {
  const queryObj = {}

  if (year) queryObj.year = year
  else return {}

  if (monthName) queryObj.month = monthName

  return queryObj
}

export default useSyncWithQuery
