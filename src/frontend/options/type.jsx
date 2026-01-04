import { useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import { Appear, MenuItem, Select } from '@/cmpt'
import { AppCtx } from '@/app-context'

const Type = () => {
  const { category, dataType, item, setDataType, year } = useContext(AppCtx)
  const dataTypeRef = useRef()
  const selectDataType = evt => setDataType(evt.target.value)
  const showTypeSelection =
    (year && category && item) || category === 'Total Expenses'

  return (
    <Appear
      when={showTypeSelection}
      motionRef={dataTypeRef}
      motionCmpt={motion.li}
    >
      <label>Type</label>
      <Select
        labelId="type-label"
        id="type"
        value={dataType}
        onChange={selectDataType}
      >
        <MenuItem key="" value=""></MenuItem>
        <MenuItem key="runningTotal" value="runningTotal">
          Running Total
        </MenuItem>
        <MenuItem key="monthlyCost" value="monthlyCost">
          Monthly Cost
        </MenuItem>
      </Select>
    </Appear>
  )
}

export default Type
