import useMonth from './use-month'
import useYear from './use-year'
import useSyncWithQuery from './use-sync-with-query'

const useOptions = () => {
  const {
    availableMonthIds,
    monthId,
    monthName,
    selectMonth,
    setAvailableMonthIds,
    setMonthId,
    setMonthName,
  } = useMonth()

  const { year, selectYear, availableYears } = useYear({
    setAvailableMonthIds,
    setMonthId,
    setMonthName,
  })

  useSyncWithQuery({ year, monthName })

  return {
    availableMonthIds,
    availableYears,
    monthId,
    monthName,
    selectMonth,
    selectYear,
    year,
  }
}

export default useOptions
