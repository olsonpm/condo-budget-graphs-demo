import { useEffect, useMemo } from 'react'
import deepEql from 'deep-eql'
import {
  discard,
  getAtPath,
  getCommonValues,
  isTruthy,
  keepWhen,
  passThrough,
} from 'common-fp'
import { isFullySelected } from './utils'
import { graphDataByYear, years as availableYears } from '@/data'

const useAvailableCompareYears = ({ hasCompareYears, ...dependencies }) => {
  const { year, category, item, dataType, compareYears, setCompareYears } =
    dependencies

  const availableCompareYears = useMemo(() => {
    if (
      !hasCompareYears ||
      !isFullySelected({ year, category, item, dataType })
    )
      return []

    const path = [category, item].filter(isTruthy)
    return passThrough(availableYears, [
      discard([year]),
      keepWhen(y => getAtPath(path)(graphDataByYear[y])),
    ])
  }, [hasCompareYears, year, category, item, dataType])

  useEffect(() => {
    if (!hasCompareYears) return

    const updatedCompareYears = getCommonValues([
      compareYears,
      availableCompareYears,
    ])
    if (!deepEql(compareYears, updatedCompareYears)) {
      setCompareYears(updatedCompareYears)
    }
  }, [hasCompareYears, availableCompareYears, compareYears, setCompareYears])

  return availableCompareYears
}

export default useAvailableCompareYears
