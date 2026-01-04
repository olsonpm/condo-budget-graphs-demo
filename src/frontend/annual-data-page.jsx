import { AnnualDataContainer, Heading } from '@/cmpt'
import Options from '@/options'

const GraphPage = ({ name }) => (
  <>
    <Heading currentPage={name} />
    <div className="content-frame">
      <Options />
      <AnnualDataContainer />
    </div>
  </>
)

export default GraphPage
