import { useRef } from 'react'
import Appear from './appear'
import useRenderedAnnualData from '@/use-rendered-annual-data'

const GraphContainer = () => {
  const graphRef = useRef()
  const renderedAnnualData = useRenderedAnnualData()

  return (
    <div className="annual-data-container">
      <Appear when={!!renderedAnnualData} motionRef={graphRef}>
        {renderedAnnualData}
      </Appear>
    </div>
  )
}

export default GraphContainer
