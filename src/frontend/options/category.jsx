import { useContext, useRef } from 'react'
import { isLaden } from 'common-fp'
import { motion } from 'framer-motion'
import { Appear, MenuItem, Select } from '@/cmpt'
import { AppCtx } from '@/app-context'

const Category = () => {
  const { availableCategories, category, selectCategory, year } =
    useContext(AppCtx)
  const categoryRef = useRef()

  return (
    <Appear
      when={year && isLaden(availableCategories)}
      motionRef={categoryRef}
      motionCmpt={motion.li}
    >
      <label id="category-label">Category</label>
      <Select
        labelId="category-label"
        id="category"
        value={category}
        onChange={selectCategory}
      >
        <MenuItem key="" value=""></MenuItem>
        {availableCategories.map(n => (
          <MenuItem key={n} value={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </Appear>
  )
}

export default Category
