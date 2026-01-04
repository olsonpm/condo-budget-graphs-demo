import { useContext } from 'react'
import Category from './category'
import CompareYears from './compare-years'
import Item from './item'
import Type from './type'
import Year from './year'
import { AppCtx } from '@/app-context'

const Options = () => {
  const { hasCompareYears } = useContext(AppCtx)
  return (
    <ul className="selectors">
      <Year />
      <Category />
      <Item />
      <Type />
      {hasCompareYears && <CompareYears />}
    </ul>
  )
}

export default Options
