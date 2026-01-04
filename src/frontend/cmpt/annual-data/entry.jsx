import { currency, customCapitalCase } from '@/utils'

import './entry.css'

const Entry = props => {
  const p = props
  return (
    <tr className="entry">
      <td>{p.yearDisplay}</td>
      <td>{p.monthDisplay}</td>
      <td className="amount">{currency.format(p.amount)}</td>
      <td>{customCapitalCase(p.description)}</td>
      <td>{customCapitalCase(p.vendorName)}</td>
    </tr>
  )
}

export default Entry
