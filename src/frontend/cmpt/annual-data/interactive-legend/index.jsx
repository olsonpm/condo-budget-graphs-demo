import { useMemo } from 'react'
import { mapValues, order, passThrough, withStringsAscending } from 'common-fp'
import { compareByManyProps } from '@/utils'
import LineButton from './line-button'

import './index.css'

const InteractiveLegend = props => {
  const { activeLines, availableLines, graphType, setActiveLines } = props

  const renderedLineButtons = useMemo(() => {
    const lineButtonProps = passThrough(availableLines, [
      order(compareByManyProps(['year', 'lineType'], withStringsAscending)),
      mapValues(({ year, lineType }) => {
        const active = activeLines.some(
          l => l.year === year && l.lineType === lineType
        )
        return {
          active,
          activeLines,
          graphType,
          lineType,
          setActiveLines,
          year,
        }
      }),
    ])

    return lineButtonProps.map(lbp => (
      <LineButton key={`${lbp.year}_${lbp.lineType}`} {...lbp} />
    ))
  }, [activeLines, availableLines, graphType, setActiveLines])

  return <div className="interactive-legend">{renderedLineButtons}</div>
}

export default InteractiveLegend
