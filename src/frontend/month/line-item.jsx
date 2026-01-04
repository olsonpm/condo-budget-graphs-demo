import { capitalCase } from 'change-case'
import { truncateToNChars } from 'common-fp'
import { currency } from '@/utils'
import { Tooltip, TooltipActivator, TooltipContent } from '@/cmpt'
import Mark from './mark'
import LinkToGraph from './link-to-graph'

import './line-item.css'

const LineItem = ({ className, data, name, category, monthId, year }) => (
  <tr className={className}>
    <th>
      <LineItemHeading name={name} />
    </th>
    <td>{currency.format(data.monthlyCost)}</td>
    <td>{currency.format(data.monthlyBudget)}</td>
    <td>
      <Mark
        actual={data.monthlyCost}
        expected={data.monthlyBudget}
        year={year}
        lineItem={name}
      />
    </td>
    <td>
      <LinkToGraph
        category={category}
        year={year}
        lineItem={name}
        monthId={monthId}
        dataType="monthlyCost"
      />
    </td>
    <td>{currency.format(data.runningTotal)}</td>
    <td>{currency.format(data.runningBudget)}</td>
    <td>
      <Mark
        actual={data.runningTotal}
        expected={data.runningBudget}
        year={year}
        lineItem={name}
      />
    </td>
    <td>
      <LinkToGraph
        category={category}
        year={year}
        lineItem={name}
        monthId={monthId}
        dataType="runningTotal"
      />
    </td>
  </tr>
)

const LineItemHeading = ({ name }) => {
  const capitalName = capitalCase(name)
  if (capitalName.length <= 30) return capitalName

  const truncatedName = truncateToNChars(30)(capitalName)
  return (
    <Tooltip>
      <TooltipActivator>{truncatedName}</TooltipActivator>
      <TooltipContent>{capitalName}</TooltipContent>
    </Tooltip>
  )
}

export default LineItem
