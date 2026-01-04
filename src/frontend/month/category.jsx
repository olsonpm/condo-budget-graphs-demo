import { mapValues, passThrough } from 'common-fp'
import LineItem from './line-item'

import './category.css'

const Category = ({ data, name, year, monthId }) => {
  const categoryName = name
  const renderedLineItems = passThrough(data.lineItems, [
    mapValues((lineItemData, name) => (
      <LineItem
        key={name}
        category={categoryName}
        data={lineItemData}
        name={name}
        year={year}
        monthId={monthId}
      />
    )),
    Object.values,
  ])

  return (
    <li className="category">
      <h2>{name}</h2>
      <table className="line-items">
        <thead>
          <tr>
            <th></th>
            <th colSpan="4">Monthly</th>
            <th className="running" colSpan="4">
              Running
            </th>
          </tr>
          <tr>
            <th></th>
            <th>Cost</th>
            <th>Budget</th>
            <th>Mark</th>
            <th>Graph</th>
            <th className="running">Total</th>
            <th>Budget</th>
            <th>Mark</th>
            <th>Graph</th>
          </tr>
        </thead>
        <tbody>
          <LineItem
            className="total"
            data={data.total}
            name="total"
            category={categoryName}
            year={year}
            monthId={monthId}
          />

          {renderedLineItems}
        </tbody>
      </table>
    </li>
  )
}

export default Category
