import { useContext } from 'react'
import { MenuItem, Select } from '@/cmpt'
import { years } from '@/data'
import { AppCtx } from '@/app-context'

const Year = () => {
  const { year, selectYear } = useContext(AppCtx)

  return (
    <li>
      <label id="year-label">Year</label>
      <Select labelId="year-label" id="year" value={year} onChange={selectYear}>
        <MenuItem key="" value=""></MenuItem>
        {years.map(n => (
          <MenuItem key={n} value={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </li>
  )
}

export default Year
