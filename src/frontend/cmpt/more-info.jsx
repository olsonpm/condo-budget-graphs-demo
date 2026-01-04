import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAnimate } from 'motion/react'
import Chevron from '@/cmpt/chevron'
import { smoothScrollTo, waitAnimationDur, waitAnimationDurSlow } from '@/utils'
import { jsFriendly as styleVars } from '@/utils/style-vars'

import './more-info.css'

const { transitionDurSeconds, transitionDurSlowSeconds } = styleVars
const MoreInfoCtx = createContext({ expanded: false, isAnimating: false })

const MoreInfo = ({ children, scrollOnExpand, slow }) => {
  const [expanded, setExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const moreInfoRef = useRef(null)
  return (
    <MoreInfoCtx.Provider
      value={{
        expanded,
        isAnimating,
        moreInfoRef,
        setExpanded,
        setIsAnimating,
        scrollOnExpand,
        slow,
      }}
    >
      <div ref={moreInfoRef} className="more-info">
        {children}
      </div>
    </MoreInfoCtx.Provider>
  )
}

const MoreInfoMain = ({ children }) => {
  const ref = useRef()
  const {
    expanded,
    isAnimating,
    setExpanded,
    setIsAnimating,
    scrollOnExpand,
    slow,
  } = useContext(MoreInfoCtx)
  const waitFn = slow ? waitAnimationDurSlow : waitAnimationDur

  const toggleExpanded = async () => {
    if (isAnimating) return

    setExpanded(!expanded)
    setIsAnimating(true)
    await waitFn()
    const isExpanding = !expanded
    if (scrollOnExpand && isExpanding) {
      smoothScrollTo(ref.current, 800)
    }

    setIsAnimating(false)
  }

  const ariaLabel = expanded ? 'Collapse' : 'Expand to see more info'

  return (
    <button
      ref={ref}
      className="main"
      onClick={toggleExpanded}
      aria-label={ariaLabel}
    >
      <span className="content">{children}</span>{' '}
      <Chevron expanded={expanded} />
    </button>
  )
}

const MoreInfoDetails = ({ children }) => {
  const { expanded, moreInfoRef, slow } = useContext(MoreInfoCtx)
  const [originalHeight, setOriginalHeight] = useState()
  const expandedState = useRef(false)
  const [scope, animate] = useAnimate()
  const duration = slow ? transitionDurSlowSeconds : transitionDurSeconds

  useEffect(() => {
    if (expanded === expandedState.current) return

    expandedState.current = expanded

    const [detailsEl, moreInfoEl] = [scope.current, moreInfoRef.current]

    const expand = async () => {
      const oldHeight = moreInfoEl.offsetHeight + 'px'
      setOriginalHeight(oldHeight)
      detailsEl.style.display = 'block'
      const newHeight = moreInfoEl.offsetHeight + 'px'

      await animate(
        moreInfoEl,
        { height: [oldHeight, newHeight] },
        { duration }
      )
      moreInfoEl.style.height = null
    }
    const contract = async () => {
      const curHeight = moreInfoEl.offsetHeight + 'px'

      await animate(
        moreInfoEl,
        { height: [curHeight, originalHeight] },
        { duration }
      )
      detailsEl.style.display = null
      moreInfoEl.style.height = null
    }

    const action = expanded ? 'expanding' : 'contracting'
    const fn = expanded ? expand : contract
    fn().catch(err => {
      console.error(`MoreInfoDetails encountered an error ${action}\n`, err)
    })
  }, [animate, duration, expanded, moreInfoRef, originalHeight, scope])

  return (
    <div ref={scope} className="details">
      {children}
    </div>
  )
}

export default MoreInfo
export { MoreInfoDetails, MoreInfoMain }
