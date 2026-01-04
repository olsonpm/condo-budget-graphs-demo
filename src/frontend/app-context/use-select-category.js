import { useCallback } from 'react'
import { graphDataByYear } from '@/data'

const useSelectCategory = dependencies => {
  const { category, item, setCategory, setItem, setItemList, year } =
    dependencies

  const selectCategory = useCallback(
    evt => {
      const selectedCategory = evt.target.value
      if (category === selectedCategory) return

      setCategory(selectedCategory)

      if (!selectedCategory) return

      if (!graphDataByYear[year][selectedCategory][item]) {
        setItem('')
      }

      if (['Total Expenses', 'Reserve'].includes(selectedCategory)) {
        setItemList([])
      } else {
        const categoryItems = Object.keys(
          graphDataByYear[year][selectedCategory]
        )
        setItemList(categoryItems)
      }
    },
    [category, item, setCategory, setItem, setItemList, year]
  )

  return selectCategory
}

export default useSelectCategory
