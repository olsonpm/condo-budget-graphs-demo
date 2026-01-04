import { useRef } from 'react'
import { Appear, Heading } from '@/cmpt'
import Options from './options'
import useRenderedOverview from './use-rendered-overview'

const Page = () => {
  const renderedOverview = useRenderedOverview()
  const overviewRef = useRef()

  return (
    <>
      <Heading currentPage="Month Overview" />
      <div className="content-frame">
        <Options />
        <Appear when={!!renderedOverview} motionRef={overviewRef}>
          {renderedOverview}
        </Appear>
      </div>
    </>
  )
}

export default Page
