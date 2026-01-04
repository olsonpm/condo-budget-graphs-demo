import { useContext, useMemo } from 'react'
import { isEmpty, mapValues, pick, passThrough } from 'common-fp'
import { MenuItem, Select } from '@/cmpt'
import { MonthCtx } from '@/month/context'
import { monthIdToName } from '../utils'

const pickFrom = obj => keys => pick(keys)(obj)

const Year = () => {
  const { availableMonthIds, monthId, selectMonth } = useContext(MonthCtx)
  const renderedMonthOpts = useMemo(() => {
    return passThrough(availableMonthIds, [
      pickFrom(monthIdToName),
      mapValues((name, id) => {
        return (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        )
      }),
      Object.values,
    ])
  }, [availableMonthIds])

  if (isEmpty(availableMonthIds)) return

  return (
    <li>
      <label id="month-label">Month</label>
      <Select
        labelId="month-label"
        id="month"
        value={monthId}
        onChange={selectMonth}
      >
        <MenuItem key="" value=""></MenuItem>
        {renderedMonthOpts}
      </Select>
    </li>
  )
}

export default Year
