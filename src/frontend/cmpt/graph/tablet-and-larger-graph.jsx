import { capitalCase } from 'change-case'
import { ResponsiveLine } from '@nivo/line'
import { tabletAndLargerTheme } from './theme'

const color = {
  actual: '#ff9c3f',
  budget: '#5aff70',
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const legends = getLegendsProp()

const TabletAndLargerGraph = props => {
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
        legendOffset: 90,
        legendPosition: 'middle',
      }}
      axisLeft={{
        format: currency.format,
        legend: 'Amount',
        legendOffset: -140,
        legendPosition: 'middle',
      }}
      margin={{ top: 80, right: 150, bottom: 140, left: 160 }}
      theme={tabletAndLargerTheme}
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
      translateX: 130,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 35,
      itemOpacity: 1,
      itemTextColor: '#ffffff',
      symbolSize: 20,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
    },
  ]
}

export default TabletAndLargerGraph
