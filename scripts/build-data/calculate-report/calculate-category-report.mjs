import { alter, mapValues, passThrough } from 'common-fp'
import { roundToCent } from '../utils/index.mjs'
import calculateMonthlyBudget from './calculate-monthly-budget.mjs'

/**
 * note: mutates categoryRunningValues
 */
const calculateCategoryReport = ({
  lineItemValues,
  categoryRunningValues,
  budget,
  year,
  category,
  monthId,
}) => {
  const lineItems = mapValues((runningLineItem, lineItem) => {
    const { entries = [], monthlyCost = 0 } = lineItemValues[lineItem] ?? {}
    const monthlyBudget = calculateMonthlyBudget({
      budget,
      year,
      category,
      lineItem,
      monthId,
    })

    runningLineItem.runningBudget += monthlyBudget
    runningLineItem.runningTotal += monthlyCost

    return {
      monthlyCost,
      monthlyBudget,
      runningTotal: roundToCent(runningLineItem.runningTotal),
      runningBudget: roundToCent(runningLineItem.runningBudget),
      entries,
    }
  })(categoryRunningValues.lineItems)

  const total = passThrough(lineItems, [
    alter(toMonthlyTotals, () => ({ cost: 0, budget: 0 })),
    monthlyTotals => {
      categoryRunningValues.total.runningTotal += monthlyTotals.cost
      categoryRunningValues.total.runningBudget += monthlyTotals.budget
      return {
        monthlyCost: roundToCent(monthlyTotals.cost),
        monthlyBudget: roundToCent(monthlyTotals.budget),
        runningTotal: roundToCent(categoryRunningValues.total.runningTotal),
        runningBudget: roundToCent(categoryRunningValues.total.runningBudget),
      }
    },
  ])

  return { lineItems, total }
}

function toMonthlyTotals(res, { monthlyCost, monthlyBudget }) {
  res.cost += monthlyCost
  res.budget += monthlyBudget
  return res
}

export default calculateCategoryReport
