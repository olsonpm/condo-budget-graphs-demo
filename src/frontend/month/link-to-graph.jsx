import { mapValues, passThrough, pick } from 'common-fp'
import { Button, IconGraph } from '@/cmpt'

import './link-to-graph.css'

const LinkToGraph = props => {
  const p = passThrough(props, [
    pick(['year', 'category', 'lineItem', 'dataType']),
    mapValues(encodeURIComponent),
  ])
  const highlightMonth = props.monthId.split('-')[1]
  const href = `./?year=${p.year}&category=${p.category}&item=${p.lineItem}&dataType=${p.dataType}&highlightMonth=${highlightMonth}`

  return (
    <Button className="link-to-graph" href={href} target="_blank">
      <IconGraph />
    </Button>
  )
}

export default LinkToGraph
