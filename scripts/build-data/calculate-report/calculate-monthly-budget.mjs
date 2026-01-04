import getCustomBudgetFn from './get-custom-budget-fn.mjs'
import { roundToCent } from '../utils/index.mjs'

const evenMonthlyBudgets = {}

const calculateMonthlyBudget = ({
  budget,
  year,
  category,
  lineItem,
  monthId,
}) => {
  const annualBudget = budget[category].lineItems[lineItem]
  const fn = getCustomBudgetFn({ year, category, lineItem })
  if (fn) return fn({ annualBudget, monthId })

  return getEvenMonthlyBudget({
    annualBudget,
    year,
    category,
    lineItem,
  })
}

function getEvenMonthlyBudget({ annualBudget, year, category, lineItem }) {
  evenMonthlyBudgets[year] ??= {}
  evenMonthlyBudgets[year][category] ??= {}
  evenMonthlyBudgets[year][category][lineItem] ??= roundToCent(
    annualBudget / 12
  )
  return evenMonthlyBudgets[year][category][lineItem]
}

export default calculateMonthlyBudget
