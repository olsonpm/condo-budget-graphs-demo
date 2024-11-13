import deepMerge from 'deepmerge'
import common from './common'

const mobileSmall = deepMerge(common, {
  axis: {
    ticks: {
      text: {
        fontSize: '12px',
      },
    },
    legend: {
      text: {
        fontSize: '20px',
      },
    },
  },
  legends: {
    text: { fontSize: 12 },
  },
  tooltip: {
    container: {
      fontSize: '12px',
    },
  },
})

export default mobileSmall
