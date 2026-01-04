import { useCallback, useContext, useRef } from 'react'
import { isLaden, joinValues } from 'common-fp'
import deepEql from 'deep-eql'
import Checkbox from '@mui/material/Checkbox'
import { motion } from 'framer-motion'
import { Appear, ListItemText, MenuItem, Select } from '@/cmpt'
import { AppCtx } from '@/app-context'

const CompareYears = () => {
  const { availableCompareYears, compareYears, setCompareYears, year } =
    useContext(AppCtx)
  const selectYears = useCallback(
    evt => {
      const selectedYears = evt.target.value.filter(isLaden)
      if (deepEql(selectedYears, compareYears)) return

      setCompareYears(selectedYears)
    },
    [setCompareYears, compareYears]
  )
  const compareYearsRef = useRef()

  return (
    <Appear
      when={year && isLaden(availableCompareYears)}
      motionRef={compareYearsRef}
      motionCmpt={motion.li}
    >
      <label id="compare-years-label">Compare</label>
      <Select
        labelId="compare-years-label"
        id="compare-years"
        multiple
        renderValue={joinValues(', ')}
        value={compareYears}
        onChange={selectYears}
      >
        {availableCompareYears.map(y => (
          <MenuItem key={y} value={y}>
            <Checkbox checked={compareYears.includes(y)} />
            <ListItemText primary={y} />
          </MenuItem>
        ))}
      </Select>
    </Appear>
  )
}

export default CompareYears
