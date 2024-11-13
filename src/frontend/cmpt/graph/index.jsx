import TabletAndLargerGraph from './tablet-and-larger-graph'
import MobileGraph from './mobile-graph'
import MobileSmallGraph from './mobile-small-graph'

const Graph = props => {
  const { viewportSize, ...graphProps } = props
  const { isMobile, isMobileSmall, isTabletAndLarger } = viewportSize

  return (
    <div className="graph-container">
      {isTabletAndLarger && <TabletAndLargerGraph {...graphProps} />}
      {isMobile && <MobileGraph {...graphProps} />}
      {isMobileSmall && <MobileSmallGraph {...graphProps} />}
    </div>
  )
}

export default Graph
