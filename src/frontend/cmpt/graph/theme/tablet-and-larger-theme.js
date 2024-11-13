import deepMerge from 'deepmerge'
import common from './common'

const tabletAndLarger = deepMerge(common, {
  axis: {
    ticks: {
      text: {
        fontSize: '16px',
      },
    },
    legend: {
      text: {
        fontSize: '30px',
      },
    },
  },
  legends: {
    text: { fontSize: 16 },
  },
  tooltip: {
    container: {
      fontSize: '16px',
    },
  },
})

export default tabletAndLarger
