import {
  compareByProp,
  mapValues,
  order,
  passThrough,
  withStringsAscending,
} from 'common-fp'
import {
  categoryByLineItem,
  lineItemData,
  lineItemsByCategory,
} from './demo-data.mjs'
import roundToCent from './round-to-cent.mjs'
import { getRandomFloat } from '../../utils.mjs'

const categoryToIndex = passThrough(lineItemsByCategory, [
  Object.entries,
  mapValues(([key], idx) => [key, idx]),
  Object.fromEntries,
])

// this is the range of generated expense amounts from the budget.  It just
// makes sure our demo data doesn't generate crazy data like a $5k expense for
// a line item with an annual budget of $200
const amountRangePct = 0.5

const buildLineItemToTotalDemo = ({ meta, year }) => {
  const metaForYear = meta.byYear[year]
  const monthIds = Object.keys(metaForYear.months)
  const lineItems = metaForYear.lineItems.all.array
  const result = {}

  for (const item of lineItems) {
    const category = categoryByLineItem[item]
    const { budget, getNumMonthlyExpenses } = lineItemData[item]
    let totalNumExpenses = 0
    const monthToNumExpenses = {}
    const multiplier = getRandomFloat(1 - amountRangePct, 1 + amountRangePct)
    const generatedActualAnnualExpense = roundToCent(multiplier * budget)

    for (const month of monthIds) {
      const numExpenses = getNumMonthlyExpenses({ monthId: month })

      result[month] ??= {}
      result[month][category] ??= {}
      result[month][category][item] ??= {}

      monthToNumExpenses[month] = numExpenses
      totalNumExpenses += numExpenses
    }

    const expenseWeights = []
    let expenseWeightSum = 0
    let curExpenseWeightIdx = 0
    for (let n = 0; n < totalNumExpenses; n += 1) {
      const weight = getRandomWeight()
      expenseWeights.push(weight)
      expenseWeightSum += weight
    }

    for (const [month, numExpenses] of Object.entries(monthToNumExpenses)) {
      const data = result[month][category][item]
      const entries = []
      const entryDate = getEntryDate({ monthId: month, year })
      let monthlyCost = 0
      for (let i = 0; i < numExpenses; i += 1) {
        const weight = expenseWeights[curExpenseWeightIdx]
        curExpenseWeightIdx += 1
        const amount = roundToCent(
          (weight / expenseWeightSum) * generatedActualAnnualExpense
        )
        monthlyCost += amount
        entries.push({
          amount,
          description: 'some description',
          entryDate,
          // invoiceDate doesn't matter, so let's just re-use entryDate
          invoiceDate: entryDate,
          invoiceID: 'some invoice id',
          vendorID: 'some vendor id',
          vendorName: 'some vendor name',
          voucherNumber: 'some voucher number',
        })
      }
      Object.assign(data, {
        monthlyCost: roundToCent(monthlyCost),
        entries,
      })
    }
  }

  const orderedResult = {}
  const byMonth = compareByProp('0', withStringsAscending)
  const byCategory = ([leftCat], [rightCat]) => {
    const leftCatIdx = categoryToIndex[leftCat]
    const rightCatIdx = categoryToIndex[rightCat]
    return leftCatIdx - rightCatIdx
  }
  const monthEntries = Object.entries(result).sort(byMonth)
  for (const [month, unorderedCategoryData] of monthEntries) {
    const orderedCategoryData = passThrough(unorderedCategoryData, [
      Object.entries,
      order(byCategory),
      Object.fromEntries,
    ])
    orderedResult[month] = orderedCategoryData
  }

  return orderedResult
}

// this is a weighted function with the intent to mostly choose a weight of 1
// with an exponentially lower probability up to 8
// see this graph for a visual representation
// https://www.desmos.com/calculator/mhfc5qntqf
function getRandomWeight() {
  const y = Math.random()
  const x = 1 + 7 * (y - 1) ** 4
  return x
}

function getEntryDate({ monthId, year }) {
  const monthNum = monthId.slice(0, 2)
  const lastDayOfMonth = new Date(
    Number(year),
    Number(monthNum) + 1,
    0
  ).getDate()
  return `${monthNum}/${lastDayOfMonth}/${year}`
}

export default buildLineItemToTotalDemo
