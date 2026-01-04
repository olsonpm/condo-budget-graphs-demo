import * as bfn from './budget-fns.mjs'

const isWinter = bfn.overMonths([
  '11-nov',
  '12-dec',
  '01-jan',
  '02-feb',
  '03-mar',
])
const customBudgetFns = initCustomMonthlyBudgetFns()

const getCustomBudgetFn = ({ year, category, lineItem }) =>
  customBudgetFns[year]?.[category]?.[lineItem] ||
  customBudgetFns.default[category]?.[lineItem]

function initCustomMonthlyBudgetFns() {
  return {
    default: {
      'Building Maintenance': {
        'Carpet R&M': bfn.annuallyOnMonth('10-oct'),
      },
      'Grounds Maintenance': {
        'Contracted Lawn Service': bfn.overMonthRange('04-apr', '11-nov'),
        'Additional Landscape': bfn.overMonthRange('04-apr', '11-nov'),
        'Snow Services': isWinter,
      },
      Utilities: {
        'Water/Sewer': bfn.quarterly({ starting: '01-jan' }),
      },
      Administrative: {
        Insurance: bfn.quarterly({ starting: '02-feb' }),
      },
    },
  }
}

export default getCustomBudgetFn
