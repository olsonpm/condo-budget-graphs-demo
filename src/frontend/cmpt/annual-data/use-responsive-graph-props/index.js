import { useMemo } from 'react'
import { capitalCase } from 'change-case'
import {
  flattenOnce,
  get,
  getMinValue,
  mapValues,
  passThrough,
  prependOne,
} from 'common-fp'
import { currency, parsedQuery } from '@/utils'
import { useBreakpoint } from '@/common-hooks'
import Tooltip from '../tooltip'
import useResponsiveAxis from './use-responsive-axis'
import useResponsiveTheme from '../use-responsive-theme'
import { getLineColor } from '../utils'

const { highlightMonth } = parsedQuery

const useResponsiveGraphProps = ({ graphType, lineProps }) => {
  const bp = useBreakpoint()
  const responsiveAxis = useResponsiveAxis()
  const theme = useResponsiveTheme()
  const yScaleMin = useMemo(() => {
    return passThrough(lineProps.data, [
      mapValues(get('data')),
      flattenOnce,
      mapValues(get('y')),
      prependOne(0),
      getMinValue,
    ])
  }, [lineProps.data])

  const toLineColorArgs = ({ id }) => {
    const parts = id.split('_')
    const year = parts.shift()
    const lineType = parts.pop()
    return { year, lineType, graphType }
  }

  const colors = passThrough(lineProps.data, [
    mapValues(toLineColorArgs),
    mapValues(getLineColor),
  ])

  const commonProps = {
    colors,
    data: lineProps.data,
    xFormat: capitalCase,
    yFormat: currency.format,
    enableSlices: 'x',
    sliceTooltip: Tooltip,
    theme,
    layers: [
      'grid',
      'markers',
      'axes',
      'areas',
      'crosshair',
      'lines',
      'points',
      'slices',
      'mesh',
      // 'legends',
    ],
    yScale: {
      type: 'linear',
      max: 'auto',
      stacked: false,
      reverse: false,
      min: yScaleMin,
    },
    markers: getMarker(),
  }

  return {
    ...commonProps,
    ...responsiveAxis,
    ...getRestOfResponsiveProps()[bp],
  }
}

function getMarker() {
  if (!highlightMonth) return []

  return [
    {
      axis: 'x',
      value: highlightMonth,
      position: 'top',
      legend: capitalCase(highlightMonth),
      legendOffsetX: -14,
      legendOffsetY: -20,
      legendOrientation: 'horizontal',
      lineStyle: { stroke: '#eded4e', strokeWidth: 2 },
      textStyle: { fill: '#eded4e' },
    },
  ]
}

function getRestOfResponsiveProps() {
  const tabletAndLarger = {
    margin: { top: 80, right: 190, bottom: 140, left: 160 },
  }

  return {
    mobileSmall: {
      margin: { top: 80, right: 80, bottom: 120, left: 80 },
    },
    mobile: {
      margin: { top: 80, right: 110, bottom: 130, left: 110 },
    },
    tablet: tabletAndLarger,
    desktop: tabletAndLarger,
  }
}

export default useResponsiveGraphProps
