import { containedIn, numberIsBetween } from 'common-fp'
import dedent from 'dedent'
import { roundToCent } from '../utils/index.mjs'
import { getMonthNum } from '../../utils.mjs'

const annuallyOnMonth =
  paymentMonthId =>
  ({ annualBudget, monthId }) => {
    return paymentMonthId === monthId ? annualBudget : 0
  }

const everyNMonths = (n, { starting }) => {
  const annualRatio = 12 / n
  if (!Number.isInteger(annualRatio)) {
    const msg = dedent(`
      everyNMonths requires n be a factor of 12
      n: ${n}
    `)
    throw new Error(msg)
  }

  const startingNum = getMonthNum(starting)
  return ({ annualBudget, monthId }) => {
    const num = getMonthNum(monthId)
    const amount = roundToCent(annualBudget / annualRatio)
    const shouldPayThisMonth = (num - startingNum) % n === 0
    return shouldPayThisMonth ? amount : 0
  }
}

const everyNYears = (n, { startingYear, onMonth }) => {
  return ({ year, annualBudget, monthId }) => {
    const shouldPayThisYear = (Number(year) - startingYear) % n === 0
    if (shouldPayThisYear) {
      return monthId === onMonth ? annualBudget : 0
    }
    // ideally we'd return zero, however in 2025 we accidentally budgeted for a
    // garage cleaning.  This makes sure that budgeted amount isn't lost
    // in calculations
    return monthId === '01-jan' ? annualBudget : 0
  }
}

const overMonthRange = (startMonthId, endMonthId) => {
  const startNum = getMonthNum(startMonthId)
  const endNum = getMonthNum(endMonthId)
  const numMonths = endNum - startNum + 1
  const isInRange = numberIsBetween(startNum, endNum)

  return ({ annualBudget, monthId }) => {
    const monthlyAmount = roundToCent(annualBudget / numMonths)
    const num = getMonthNum(monthId)
    return isInRange(num) ? monthlyAmount : 0
  }
}

const overMonths = includedMonthIds => {
  const numMonths = includedMonthIds.length
  const isIncluded = containedIn(includedMonthIds)

  return ({ annualBudget, monthId }) => {
    const monthlyAmount = roundToCent(annualBudget / numMonths)
    return isIncluded(monthId) ? monthlyAmount : 0
  }
}

const quarterly = ({ starting }) => everyNMonths(3, { starting })

export {
  annuallyOnMonth,
  everyNMonths,
  everyNYears,
  overMonthRange,
  overMonths,
  quarterly,
}
