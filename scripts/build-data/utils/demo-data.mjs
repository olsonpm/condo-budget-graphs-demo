import { oneExpense, variableExpenses } from './demo-monthly-expense-fns.mjs'

const isWinter = oneExpense.forEachMonth([
  '01-jan',
  '02-feb',
  '03-mar',
  '11-nov',
  '12-dec',
])

const lineItemsByCategory = {
  'Building Maintenance': [
    'Building Maintenance',
    'Electrical Repairs',
    'Carpet R&M',
  ],
  'Grounds Maintenance': [
    'Contracted Lawn Service',
    'Additional Landscape',
    'Snow Services',
  ],
  Utilities: ['Electric', 'Water/Sewer', 'Trash Removal', 'Gas-Building'],
  Administrative: ['Cpa Services', 'Legal Expense', 'Insurance'],
}

const categoryByLineItem = {}
for (const [category, lineItems] of Object.entries(lineItemsByCategory)) {
  for (const li of lineItems) {
    categoryByLineItem[li] = category
  }
}

/**
 * for now let's just have the same budget for all years.  We can change it per
 * year later if we want to.
 */

const lineItemData = {
  'Building Maintenance': {
    budget: 5000,
    // typically zero or one with up to 4
    getNumMonthlyExpenses: () => {
      const rand = Math.random()
      const float = rand > 0.2 ? -2.5 * rand + 2.5 : -12.5 * rand + 4.5
      return Math.floor(float)
    },
  },
  'Electrical Repairs': {
    budget: 1000,
    getNumMonthlyExpenses: variableExpenses.randomlyBetween(0, 2),
  },
  'Carpet R&M': {
    budget: 300,
    getNumMonthlyExpenses: oneExpense.annuallyOnMonth('10-oct'),
  },
  'Contracted Lawn Service': {
    budget: 800,
    getNumMonthlyExpenses: oneExpense.overMonthRange('04-mar', '11-nov'),
  },
  'Additional Landscape': {
    budget: 500,
    getNumMonthlyExpenses: variableExpenses.randomlyBetween(0, 2, {
      overMonthRange: ['03-mar', '11-nov'],
    }),
  },
  'Snow Services': {
    budget: 600,
    getNumMonthlyExpenses: isWinter,
  },
  Electric: {
    budget: 500,
    getNumMonthlyExpenses: oneExpense.monthly,
  },
  'Water/Sewer': {
    budget: 700,
    getNumMonthlyExpenses: oneExpense.quarterly({ starting: '01-jan' }),
  },
  'Trash Removal': {
    budget: 250,
    getNumMonthlyExpenses: oneExpense.monthly,
  },
  'Gas-Building': {
    budget: 300,
    getNumMonthlyExpenses: oneExpense.monthly,
  },
  'Cpa Services': {
    budget: 200,
    getNumMonthlyExpenses: oneExpense.annuallyOnMonth('04-apr'),
  },
  'Legal Expense': {
    budget: 150,
    getNumMonthlyExpenses: variableExpenses.randomlyOneOf([0, 0, 0, 1]),
  },
  Insurance: {
    budget: 220,
    getNumMonthlyExpenses: oneExpense.quarterly({ starting: '02-feb' }),
  },
}

export { categoryByLineItem, lineItemData, lineItemsByCategory }
