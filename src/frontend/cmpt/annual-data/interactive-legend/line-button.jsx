import { useCallback } from 'react'
import cn from 'classnames'
import { appendOne, discardWhen } from 'common-fp'
import { capitalCase } from 'change-case'
import Button from '@mui/material/Button'
import IconInvisible from '@/cmpt/icon-invisible'
import { isDeepEqlTo } from '@/utils'
import { getLineColor } from '../utils'

import './line-button.css'

const LineButton = props => {
  const { active, activeLines, graphType, lineType, setActiveLines, year } =
    props

  const withYear = graphType === 'compare'
  const label =
    graphType === 'compare'
      ? `'${year.slice(2)} ${capitalCase(lineType)}`
      : capitalCase(lineType)
  const color = getLineColor({ graphType, lineType, year })

  const toggleLine = useCallback(() => {
    const line = { year, lineType }
    const update = active ? discardWhen(isDeepEqlTo(line)) : appendOne(line)

    setActiveLines(update(activeLines))
  }, [active, activeLines, lineType, setActiveLines, year])

  const labelClasses = cn('line-button_label', {
    'with-year': withYear,
    'without-year': !withYear,
  })

  return (
    <Button className="line-button" onClick={toggleLine}>
      <IconInvisible
        className={cn('line-button_icon-active', { invisible: active })}
      />
      <span className="line-button_circle" style={{ backgroundColor: color }} />
      <span className={labelClasses}>{label}</span>
    </Button>
  )
}

export default LineButton
