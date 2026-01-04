import { mapValues, passThrough } from 'common-fp'
import { currency } from '@/utils'
import { calculatedReport } from '@/data'
import Category from './category'
import Mark from './mark'
import LinkToGraph from './link-to-graph'

import './overview.css'

const Overview = ({ monthId, year }) => {
  const { ['Total Expenses']: total, ...categoryData } =
    calculatedReport[year][monthId]

  const renderedCategories = passThrough(categoryData, [
    mapValues((lineItemValues, category) => (
      <Category
        key={category}
        name={category}
        data={lineItemValues}
        year={year}
        monthId={monthId}
      />
    )),
    Object.values,
  ])

  return (
    <ul className="overview">
      <li>
        <h2>Total Expenses</h2>
        <ul className="total-expense-types">
          <li>
            <h3>Monthly</h3>
            <dl>
              <dt>Cost</dt>
              <dd>{currency.format(total.monthlyCost)}</dd>

              <dt>Budget</dt>
              <dd>{currency.format(total.monthlyBudget)}</dd>

              <dt>Mark</dt>
              <dd>
                <Mark
                  actual={total.monthlyCost}
                  expected={total.monthlyBudget}
                  year={year}
                  lineItem="Total Expenses"
                />
              </dd>

              <dt>Graph</dt>
              <dd>
                <LinkToGraph
                  category="Total Expenses"
                  year={year}
                  lineItem={name}
                  monthId={monthId}
                  dataType="monthlyCost"
                />
              </dd>
            </dl>
          </li>

          <li>
            <h3>Running</h3>
            <dl>
              <dt>Total</dt>
              <dd>{currency.format(total.runningTotal)}</dd>

              <dt>Budget</dt>
              <dd>{currency.format(total.runningBudget)}</dd>

              <dt>Mark</dt>
              <dd>
                <Mark
                  actual={total.runningTotal}
                  expected={total.runningBudget}
                  year={year}
                  lineItem="Total Expenses"
                />
              </dd>

              <dt>Graph</dt>
              <dd>
                <LinkToGraph
                  category="Total Expenses"
                  year={year}
                  lineItem={name}
                  monthId={monthId}
                  dataType="runningTotal"
                />
              </dd>
            </dl>
          </li>
        </ul>
      </li>
      {renderedCategories}
    </ul>
  )
}

export default Overview
