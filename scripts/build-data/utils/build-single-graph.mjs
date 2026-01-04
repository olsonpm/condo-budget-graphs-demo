const bulidSingleGraph = (relevantBudgetData, dataType, idPrefix) => {
  const { buildActual, buildBudget } = getBuildActualAndBudget(dataType)
  const actual = buildActual(relevantBudgetData)
  const budget = buildBudget(relevantBudgetData)

  return {
    data: [
      {
        id: `${idPrefix}_actual`,
        data: actual,
      },
      {
        id: `${idPrefix}_budget`,
        data: budget,
      },
    ],
  }
}

function getBuildActualAndBudget(dataType) {
  if (dataType === 'runningTotal') {
    return {
      buildActual: makeBuildLine('runningTotal'),
      buildBudget: makeBuildLine('runningBudget'),
    }
  } else {
    // dataType === 'monthlyCost'
    return {
      buildActual: makeBuildLine('monthlyCost'),
      buildBudget: makeBuildLine('monthlyBudget'),
    }
  }
}

function makeBuildLine(key) {
  return data => data.monthly.map(v => ({ x: v.month, y: v[key] }))
}

export default bulidSingleGraph
