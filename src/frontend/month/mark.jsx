import { clampTo, currency } from '@/utils'
import { Tooltip, TooltipActivator, TooltipContent } from '@/cmpt'

import './mark.css'

const unexpectedSentryLineItems = {
  2025: new Set([
    '8069  TECHNOLOGY FEE',
    '8390  FEDERAL/STATE REQUIRED CORPORATE REPORT',
  ]),
}

/**
 * I don't know statistics. This is a very simplified heuristic for determining
 * how much we should care about a given cost.
 */

const Mark = ({ actual, expected, year, lineItem }) => {
  const colorPercentage = getColorPercentage(actual, expected)
  const color = getColor(colorPercentage, year, lineItem)
  const diff = actual - expected
  const diffCurrency = currency.format(Math.abs(diff))

  let sign = ''
  if (diff > 0) sign = '+'
  if (diff < 0) sign = '-'

  const diffPercentage = expected
    ? `  (${sign}${Math.round((Math.abs(diff) / expected) * 100)}%)`
    : ''
  const title = `${sign}${diffCurrency}${diffPercentage}`

  return (
    <Tooltip>
      <TooltipActivator>
        <div className="mark-container">
          <div className="mark" style={{ backgroundColor: color }}></div>
        </div>
      </TooltipActivator>
      <TooltipContent className="mark-tooltip">{title}</TooltipContent>
    </Tooltip>
  )
}

// from ivomynttinen.com/blog/get-a-color-value-by-percentage-from-gradient
function getColor(percentage, year, lineItem) {
  const color = {
    goodNuff: '#48bf3f',
    maybeTakeALook: '#c5d047',
    shouldTakeALook: '#d04747',
  }
  // when percentage is undefined, it means we didn't budget for this cost.
  // There are two cases where this happens.
  // 1. sentry messes up and adds a line item without telling us.  In this case
  //   there's nothing we can do, so we can show green.
  // 2. we have a non-monthly custom budget set and a payment was made outside
  //   when we expect.  In this case we should look into why it happened.
  if (percentage === undefined) {
    return unexpectedSentryLineItems[year]?.has(lineItem)
      ? color.goodNuff
      : color.shouldTakeALook
  }

  if (percentage < 15) return color.goodNuff

  const clampPct = clampTo(0, 100)
  // 15% is our "goodNuff" threshold where we show green
  // 80% should show red
  // 65 is 80 - 15, where 15% shows yellow, and 80% shows red.  Anything in
  //   between is a value on the gradient.
  let weightedPct = ((percentage - 15) / 65) * 100
  weightedPct = clampPct(weightedPct)

  const gradient = [color.maybeTakeALook, color.shouldTakeALook]

  const index = weightedPct / 100
  const i = Math.floor(index)
  const t = index - i

  const color1 = gradient[i]
  const h = Math.min(i + 1, 1)
  const color2 = gradient[h]

  const rgb = [0, 1, 2].map(j => {
    const c1 = parseInt(color1.slice(1 + j * 2, 3 + j * 2), 16)
    const c2 = parseInt(color2.slice(1 + j * 2, 3 + j * 2), 16)
    return Math.round(c1 * (1 - t) + c2 * t)
  })

  return '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('')
}

function getColorPercentage(actual, expected) {
  // if we have an expense without a budget, then return undefined.  getColor
  // handles this accordingly
  if (!expected && actual) return

  // Handling items that are underbudget will be complex.  For instance,
  // in cases like the water bill that comes once every 3 months, we should
  // set the monthly budget accordingly.  Other times a bill is missed and we
  // should know about it.  And sometimes it just means we didn't have anything
  // to spend on, which is good.
  //
  // So for now let's punt on the complexity and pretending everything's fine.
  const diff = actual - expected
  if (diff <= 0) return 0

  const percentage = (Math.abs(diff) / expected) * 100
  return percentage
}

export default Mark
