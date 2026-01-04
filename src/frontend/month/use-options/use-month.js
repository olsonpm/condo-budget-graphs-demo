import { parsedQuery } from '@/utils'
import { useCallback, useState } from 'react'
import { meta } from '@/data'
import { monthIdToName, monthNameToId } from '../utils'

const initial = {
  monthName: parsedQuery.month || '',
  availableMonthIds: Object.keys(meta.byYear[parsedQuery.year]?.months || {}),
}
initial.monthId = monthNameToId[initial.monthName] || ''

const useMonth = () => {
  const [availableMonthIds, setAvailableMonthIds] = useState(
    initial.availableMonthIds
  )
  const [monthId, setMonthId] = useState(initial.monthId)
  const [monthName, setMonthName] = useState(initial.monthName)

  const selectMonth = useCallback(evt => {
    const id = evt.target.value
    setMonthId(id)
    setMonthName(monthIdToName[id])
  }, [])

  return {
    availableMonthIds,
    monthId,
    monthName,
    selectMonth,
    setAvailableMonthIds,
    setMonthId,
    setMonthName,
  }
}

export default useMonth
