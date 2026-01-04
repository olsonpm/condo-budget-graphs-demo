import {
  containedIn,
  discardLast,
  getRandomValue,
  last,
  numberIsBetween,
} from 'common-fp'
import dedent from 'dedent'
import { getMonthNum, getRandomInt } from '../../utils.mjs'

const oneExpense = {
  annuallyOnMonth: paymentMonthId => {
    return ({ monthId }) => paymentMonthId === monthId
  },
  everyNMonths: (n, { starting }) => {
    const annualRatio = 12 / n
    if (!Number.isInteger(annualRatio)) {
      const msg = dedent(`
        everyNMonths requires n be a factor of 12
        n: ${n}
      `)
      throw new Error(msg)
    }

    const startingNum = getMonthNum(starting)
    return ({ monthId }) => {
      const num = getMonthNum(monthId)
      const shouldPayThisMonth = (num - startingNum) % n === 0
      return shouldPayThisMonth ? 1 : 0
    }
  },
  everyNYears: (n, { startingYear, onMonth }) => {
    return ({ year, monthId }) => {
      const shouldPayThisYear = (Number(year) - startingYear) % n === 0
      return shouldPayThisYear && monthId === onMonth ? 1 : 0
    }
  },
  forEachMonth: includedMonthIds => {
    const shouldPayForMonth = containedIn(includedMonthIds)

    return ({ monthId }) => {
      return shouldPayForMonth(monthId) ? 1 : 0
    }
  },
  monthly: () => 1,
  overMonthRange: (startMonthId, endMonthId) => {
    const isInMonthRange = makeIsInMonthRange(startMonthId, endMonthId)

    return ({ monthId }) => isInMonthRange(monthId)
  },
  quarterly: ({ starting }) => oneExpense.everyNMonths(3, { starting }),
}

const variableExpenses = {
  randomlyBetween: withMonthOptions(getRandomInt),
  randomlyOneOf: withMonthOptions(getRandomValue),
}

function withMonthOptions(getNumExpenses) {
  return (...args) => {
    const monthOpts = last(args)
    const { includedMonthIds, overMonthRange } = monthOpts
    let getNumExpensesArgs = discardLast(1)(args)

    let shouldPayThisMonth = () => true
    if (includedMonthIds) shouldPayThisMonth = containedIn(includedMonthIds)
    else if (overMonthRange) {
      const isInMonthRange = makeIsInMonthRange(
        overMonthRange[0],
        overMonthRange[1]
      )
      shouldPayThisMonth = isInMonthRange
    } else {
      getNumExpensesArgs = args
    }

    return ({ monthId }) => {
      return shouldPayThisMonth(monthId)
        ? getNumExpenses(...getNumExpensesArgs)
        : 0
    }
  }
}

function makeIsInMonthRange(startMonthId, endMonthId) {
  const startNum = getMonthNum(startMonthId)
  const endNum = getMonthNum(endMonthId)
  const isInRange = numberIsBetween(startNum, endNum)

  return monthId => {
    const num = getMonthNum(monthId)
    return isInRange(num) ? 1 : 0
  }
}

export { oneExpense, variableExpenses }
