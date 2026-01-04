import { useMemo, useState } from 'react'
import { parsedQuery } from '@/utils'
import useSelectCategory from './use-select-category'
import useSelectYear from './use-select-year'
import { graphDataByYear } from '@/data'
import useAvailableCompareYears from './use-available-compare-years'
import useSyncOptionsWithQuery from './use-sync-options-with-query'

const initialItems = Object.keys(
  graphDataByYear?.[parsedQuery.year]?.[parsedQuery.category] || {}
)

const useOptions = ({ hasCompareYears }) => {
  const [year, setYear] = useState(parsedQuery.year || '')
  const [category, setCategory] = useState(parsedQuery.category || '')
  const [item, setItem] = useState(parsedQuery.item || '')
  const [itemList, setItemList] = useState(initialItems)
  const [dataType, setDataType] = useState(parsedQuery.dataType || '')
  const [compareYears, setCompareYears] = useState(
    hasCompareYears ? parsedQuery.compareYears || [] : []
  )

  useSyncOptionsWithQuery({ category, dataType, item, year, compareYears })
  const selectYear = useSelectYear({
    category,
    item,
    setCategory,
    setItem,
    setYear,
    year,
  })
  const selectCategory = useSelectCategory({
    category,
    item,
    setCategory,
    setItem,
    setItemList,
    year,
  })
  const availableCategories = useMemo(
    () => Object.keys(graphDataByYear[year] || {}),
    [year]
  )
  const availableCompareYears = useAvailableCompareYears({
    hasCompareYears,
    year,
    category,
    item,
    dataType,
    compareYears,
    setCompareYears,
  })

  return {
    availableCategories,
    availableCompareYears,
    category,
    compareYears,
    dataType,
    item,
    itemList,
    selectCategory,
    selectYear,
    setCompareYears,
    setDataType,
    setItem,
    setYear,
    year,
  }
}

export default useOptions
