import { mapValues } from 'common-fp'
import { roundToCent } from './utils/index.mjs'

const startingReserve = 10000

const buildReserveDemo = ({ allYears, meta }) => {
  let reserve = startingReserve
  return allYears
    .map(year => Number(year))
    .reduce((res, year) => {
      const metaForYear = meta.byYear[year]
      res[year] = mapValues((_monthName, monthId) => {
        if (monthId === '01-jan' && year === 2024) {
          return reserve
        }
        const pctChange = getWeightedPctChange()
        reserve = roundToCent(reserve * pctChange)
        return reserve
      })(metaForYear.months)

      return res
    }, {})
}

/**
 * this is a function intended to usually bump the reserve up a small percent
 * per month.  Occasionally the reserves will be decreased.
 */
function getWeightedPctChange() {
  const rand = Math.random()
  return rand < 0.1 ? 0.97 + 0.1 * rand : 0.997 + 0.03 * rand
}

export default buildReserveDemo
