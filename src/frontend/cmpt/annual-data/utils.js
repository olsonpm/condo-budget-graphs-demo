const lineColors = {
  // compare = the compare page which hardcodes colors based off the year/type
  compare: {
    2024: {
      actual: '#7eabf2',
      budget: '#7ef1b4',
    },
    2025: {
      actual: '#de9471',
      budget: '#ded172',
    },
  },
  simple: {
    actual: '#ff9c3f',
    budget: '#5aff70',
  },
}

const getLineColor = ({ graphType, lineType, year }) => {
  return graphType === 'compare'
    ? lineColors.compare[year][lineType]
    : lineColors.simple[lineType]
}

export { getLineColor }
