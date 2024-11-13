const bulidSingleGraph = (relevantBudgetData, dataType, idPrefix) => {
  const { buildActual, buildBudget } = getBuildActualAndBudget(dataType)
  const actual = buildActual(relevantBudgetData)
  const budget = buildBudget(relevantBudgetData)
  const min = Math.min(0, ...[...actual, ...budget].flatMap(d => d.y))

  return {
    data: [
      {
        id: `${idPrefix}-actual`,
        data: actual,
      },
      {
        id: `${idPrefix}-budget`,
        data: budget,
      },
    ],
    yScale: { min },
  }
}

function getBuildActualAndBudget(dataType) {
  if (dataType === 'runningTotal') {
    return {
      buildActual: makeBuildLine('runningTotal'),
      buildBudget: makeBuildLine('runningBudget'),
    }
  } else {
    // dataType === 'monthlyCost
    return {
      buildActual: makeBuildLine('monthlyCost'),
      buildBudget: buildMonthlyBudget,
    }
  }
}

function makeBuildLine(key) {
  return data => data.monthly.map(v => ({ x: v.month, y: v[key] }))
}

function buildMonthlyBudget(data) {
  return data.monthly.map(({ month }) => ({
    x: month,
    y: data.budget.monthly,
  }))
}

export default bulidSingleGraph
