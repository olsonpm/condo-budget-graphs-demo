import { invert } from 'common-fp'

const monthIdToName = {
  '01-jan': 'January',
  '02-feb': 'February',
  '03-mar': 'March',
  '04-apr': 'April',
  '05-may': 'May',
  '06-jun': 'June',
  '07-jul': 'July',
  '08-aug': 'August',
  '09-sep': 'September',
  '10-oct': 'October',
  '11-nov': 'November',
  '12-dec': 'December',
}

const monthNameToId = invert(monthIdToName)

export { monthIdToName, monthNameToId }
