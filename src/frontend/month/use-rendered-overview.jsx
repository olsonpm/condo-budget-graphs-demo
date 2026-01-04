import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { pWaitMs } from 'common-fp'
import Overview from './overview'
import { MonthCtx } from './context'

const useRenderedOverview = () => {
  const { year, monthId } = useContext(MonthCtx)
  const [renderedOverview, setRenderedOverview] = useState()
  const stateRef = useRef({})

  const performTransition = useCallback(
    updatedRenderedOverview => {
      const innerFn = async () => {
        setRenderedOverview()
        await pWaitMs(400)
        setRenderedOverview(updatedRenderedOverview)
      }
      innerFn()
    },
    [setRenderedOverview]
  )

  useEffect(() => {
    if (!year || !monthId) return

    const prevStateId = stateRef.current.curId
    const curStateId = `${year}_${monthId}`
    if (prevStateId === curStateId) return

    const renderedOverview = <Overview year={year} monthId={monthId} />
    if (!prevStateId) setRenderedOverview(renderedOverview)
    else performTransition(renderedOverview)
  }, [year, monthId, performTransition])

  return renderedOverview
}

export default useRenderedOverview
