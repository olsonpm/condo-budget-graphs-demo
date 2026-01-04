import { useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import { Appear, MenuItem, Select } from '@/cmpt'
import { customCapitalCase } from '@/utils'
import { AppCtx } from '@/app-context'

const Item = () => {
  const { category, item, itemList, setItem, year } = useContext(AppCtx)

  const selectItem = evt => setItem(evt.target.value)
  const itemRef = useRef()

  const showItemSelection =
    year && category && !['Total Expenses', 'Reserve'].includes(category)

  return (
    <Appear when={showItemSelection} motionRef={itemRef} motionCmpt={motion.li}>
      <label id="item-label">Item</label>
      <Select labelId="item-label" id="item" value={item} onChange={selectItem}>
        <MenuItem key="" value=""></MenuItem>
        {itemList.map(n => (
          <MenuItem className="category-item" key={n} value={n}>
            {customCapitalCase(n)}
          </MenuItem>
        ))}
      </Select>
    </Appear>
  )
}

export default Item
