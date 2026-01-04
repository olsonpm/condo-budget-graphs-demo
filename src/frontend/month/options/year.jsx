import { useContext } from 'react'
import { MenuItem, Select } from '@/cmpt'
import { MonthCtx } from '@/month/context'

const Year = () => {
  const { availableYears, year, selectYear } = useContext(MonthCtx)

  return (
    <li>
      <label id="year-label">Year</label>
      <Select labelId="year-label" id="year" value={year} onChange={selectYear}>
        <MenuItem key="" value=""></MenuItem>
        {availableYears.map(n => (
          <MenuItem key={n} value={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </li>
  )
}

export default Year
