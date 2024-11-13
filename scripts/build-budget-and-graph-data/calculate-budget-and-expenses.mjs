import { get, mapValues, passThrough, sum } from './fp-utils/index.mjs'
import { roundToCent } from './utils/index.mjs'

const calculateBudgetAndExpenses = budgetAndExpenses => {
  const budget = calculateBudget(budgetAndExpenses.budget)
  const runningValues = initRunningValues(budgetAndExpenses['01-jan'])
  const monthlyExpenses = {}

  for (const [month, mv] of Object.entries(budgetAndExpenses)) {
    monthlyExpenses[month] = {}

    for (const [category, cv] of Object.entries(mv)) {
      const categoryBudget = budget[category]
      const categoryRunningValues = runningValues[category]
      monthlyExpenses[month][category] = calculateExpenses(
        cv,
        categoryRunningValues,
        categoryBudget
      )
    }
  }

  return {
    ...monthlyExpenses,
    budget,
  }
}

function initRunningValues(firstMonthExpenses) {
  const initVal = {
    runningTotal: 0,
    runningBudget: 0,
  }
  return mapValues(categoryVal => ({
    lineItems: mapValues(() => ({ ...initVal }))(categoryVal.lineItems),
    total: { ...initVal },
  }))(firstMonthExpenses)
}

function calculateBudget(budget) {
  return mapValues(categoryVal => {
    const lineItems = mapValues(({ annual }) => ({
      annual,
      monthly: roundToCent(annual / 12),
    }))(categoryVal.lineItems)

    const total = passThrough(categoryVal.lineItems, [
      mapValues(get('annual')),
      Object.values,
      sum,
      annualTotal => ({
        total: annualTotal,
        monthly: roundToCent(annualTotal / 12),
      }),
    ])

    return { lineItems, total }
  })(budget)
}

/**
 * note: mutates categoryRunningValues
 */
function calculateExpenses(categoryVal, categoryRunningValues, categoryBudget) {
  const lineItems = mapValues(({ monthlyCost }, lineItem) => {
    const runningLineItem = categoryRunningValues.lineItems[lineItem]
    const budgetLineItem = categoryBudget.lineItems[lineItem]

    runningLineItem.runningBudget += budgetLineItem.monthly
    runningLineItem.runningTotal += monthlyCost

    return {
      monthlyCost,
      runningTotal: roundToCent(runningLineItem.runningTotal),
      runningBudget: roundToCent(runningLineItem.runningBudget),
    }
  })(categoryVal.lineItems)

  const total = passThrough(lineItems, [
    mapValues(get('monthlyCost')),
    Object.values,
    sum,
    monthlyCostTotal => {
      categoryRunningValues.total.runningTotal += monthlyCostTotal
      categoryRunningValues.total.runningBudget += categoryBudget.total.monthly
      return {
        monthlyCost: roundToCent(monthlyCostTotal),
        runningTotal: roundToCent(categoryRunningValues.total.runningTotal),
        runningBudget: roundToCent(categoryRunningValues.total.runningBudget),
      }
    },
  ])

  return { lineItems, total }
}

export default calculateBudgetAndExpenses
