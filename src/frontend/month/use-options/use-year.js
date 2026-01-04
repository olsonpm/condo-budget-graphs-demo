import { parsedQuery } from '@/utils'
import { useCallback, useState } from 'react'
import { meta } from '@/data'

const availableYears = Object.keys(meta.byYear)

const useYear = ({ setAvailableMonthIds, setMonthId, setMonthName }) => {
  const [year, setYear] = useState(parsedQuery.year || '')

  const selectYear = useCallback(
    evt => {
      const updatedYear = evt.target.value
      setYear(updatedYear)

      const monthIds = updatedYear
        ? Object.keys(meta.byYear[updatedYear].months)
        : []
      setAvailableMonthIds(monthIds)
      setMonthId('')
      setMonthName('')
    },
    [setAvailableMonthIds, setMonthId, setMonthName]
  )

  return { year, selectYear, availableYears }
}

export default useYear
