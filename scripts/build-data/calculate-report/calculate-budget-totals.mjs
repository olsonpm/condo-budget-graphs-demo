import { alter, passThrough, sumValues, update } from 'common-fp'
import { roundToCent } from '../utils/index.mjs'

const calculateBudgetTotals = budget => {
  return passThrough(budget, [
    alter(
      (result, lineItems, category) => {
        const total = sumValues(lineItems)

        result[category] = { lineItems, total }
        result['Total Expenses'] += total
        return result
      },
      () => ({
        ['Total Expenses']: 0,
      })
    ),
    update({ ['Total Expenses']: roundToCent }),
  ])
}

export default calculateBudgetTotals
