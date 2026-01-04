import { ResponsiveLine } from '@nivo/line'
import useResponsiveGraphProps from './use-responsive-graph-props'
import InteractiveLegend from './interactive-legend'
import Entries from './entries'

const AnnualData = props => {
  const {
    activeYears,
    category,
    hasLegend = true,
    lineItem,
    lineProps,
    ...interactiveLegendProps
  } = props
  const { graphType } = interactiveLegendProps
  const graphProps = useResponsiveGraphProps({
    graphType,
    lineProps,
  })

  return (
    <div className="annual-data">
      <div className="graph">
        <ResponsiveLine {...graphProps} />
        {hasLegend && <InteractiveLegend {...interactiveLegendProps} />}
      </div>
      {lineItem && lineItem !== 'total' && (
        <Entries
          activeYears={activeYears}
          category={category}
          lineItem={lineItem}
        />
      )}
    </div>
  )
}

export default AnnualData
