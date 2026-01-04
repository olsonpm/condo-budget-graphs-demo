import { useMemo } from 'react'
import './tooltip.css'

const Tooltip = props => {
  const slicePoints = props.slice.points

  const renderedPoints = useMemo(() => {
    return slicePoints
      .sort(byValueDescending)
      .map(p => (
        <Point key={p.id} color={p.serieColor} value={p.data.yFormatted} />
      ))
  }, [slicePoints])

  return <div className="slice-tooltip">{renderedPoints}</div>
}

const Point = ({ color, value }) => (
  <div className="slice-tooltip_point">
    <span className="color" style={{ backgroundColor: color }} />
    <span className="value">{value}</span>
  </div>
)

function byValueDescending(leftPoint, rightPoint) {
  return rightPoint.data.y - leftPoint.data.y
}

export default Tooltip
