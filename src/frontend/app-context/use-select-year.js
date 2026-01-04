import { useCallback } from 'react'
import { graphDataByYear } from '@/data'

const useSelectYear = dependencies => {
  const { category, item, setCategory, setItem, setYear, year } = dependencies

  const selectYear = useCallback(
    evt => {
      const selectedYear = evt.target.value
      if (year === selectedYear) return

      setYear(selectedYear)
      if (!selectedYear) return
      else if (!graphDataByYear[selectedYear][category]) {
        setCategory('')
        setItem('')
      } else if (!graphDataByYear[selectedYear][category][item]) {
        setItem('')
      }
    },
    [category, item, setYear, setCategory, setItem, year]
  )

  return selectYear
}

export default useSelectYear
