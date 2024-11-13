import { capitalCase } from 'change-case'
import { ResponsiveLine } from '@nivo/line'
import { mobileSmallTheme } from './theme'
import { currency } from '@/utils'

const color = {
  actual: '#ff9c3f',
  budget: '#5aff70',
}

const legends = getLegendsProp()

const MobileSmallGraph = props => {
  const conditionalProps = {}
  if (props.hasLegend) conditionalProps.legends = legends

  return (
    <ResponsiveLine
      data={props.lineProps.data}
      xFormat={capitalCase}
      yFormat={currency.format}
      axisBottom={{
        format: capitalCase,
        legend: 'Month',
        legendOffset: 60,
        legendPosition: 'middle',
      }}
      axisLeft={{
        format: currency.formatCompact,
        legend: 'Amount',
        legendOffset: -70,
        legendPosition: 'middle',
      }}
      margin={{ top: 80, right: 80, bottom: 120, left: 80 }}
      theme={mobileSmallTheme}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
        ...props.lineProps.yScale,
      }}
      useMesh={true}
      colors={[color.actual, color.budget]}
      {...conditionalProps}
    />
  )
}

function getLegendsProp() {
  return [
    {
      data: [
        {
          label: 'Actual',
          color: color.actual,
        },
        {
          label: 'Budget',
          color: color.budget,
        },
      ],
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 95,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 35,
      itemOpacity: 1,
      itemTextColor: '#ffffff',
      symbolSize: 12,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
    },
  ]
}

export default MobileSmallGraph
