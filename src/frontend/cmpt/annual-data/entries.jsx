import {
  compose,
  isLaden,
  keepWhen,
  mapValues,
  omit,
  passThrough,
  pick,
} from 'common-fp'
import { calculatedReport } from '@/data'
import { monthIdToName } from '@shared'
import Entry from './entry'
import { MoreInfo, MoreInfoMain, MoreInfoDetails } from '@/cmpt'

import './entries.css'

const Entries = props => {
  const { activeYears, category, lineItem } = props
  const getMonthlyEntries = compose([
    omit(['budget']),
    mapValues(categories => categories[category].lineItems[lineItem].entries),
    keepWhen(isLaden),
  ])
  const renderedEntries = passThrough(calculatedReport, [
    pick(activeYears),
    mapValues(getMonthlyEntries),
    mapValues(toRenderedEntries),
    Object.values,
  ])

  return (
    <section className="entries">
      <MoreInfo scrollOnExpand slow>
        <MoreInfoMain>
          <h2>Entries</h2>
        </MoreInfoMain>
        <MoreInfoDetails>
          <table className="annual-entries">
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>{renderedEntries}</tbody>
          </table>
        </MoreInfoDetails>
      </MoreInfo>
    </section>
  )
}

function toRenderedEntries(monthlyEntries, year) {
  return passThrough(monthlyEntries, [
    Object.entries,
    mapValues(([monthId, entries], monthlyIdx) => {
      const monthName = monthIdToName[monthId].slice(0, 3)
      const yearDisplay = monthlyIdx === 0 ? year : ''
      return entries.map((props, entryIdx) => (
        <Entry
          key={entryIdx}
          monthDisplay={entryIdx === 0 ? monthName : ''}
          yearDisplay={entryIdx === 0 ? yearDisplay : ''}
          {...props}
        />
      ))
    }),
    Object.values,
  ])
}

export default Entries
