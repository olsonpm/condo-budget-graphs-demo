import deepMerge from 'deepmerge'
import common from './common'

const mobile = deepMerge(common, {
  axis: {
    ticks: {
      text: {
        fontSize: '14px',
      },
    },
    legend: {
      text: {
        fontSize: '24px',
      },
    },
  },
  legends: {
    text: { fontSize: 14 },
  },
  tooltip: {
    container: {
      fontSize: '14px',
    },
  },
})

export default mobile
