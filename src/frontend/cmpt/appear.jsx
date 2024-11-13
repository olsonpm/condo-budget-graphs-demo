'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { jsFriendly } from '@/utils/style-vars'

const positionByFrom = getPositionByFrom()
const asIs = { initial: {}, animate: {} }

const Appear = props => {
  const {
    children,
    className,
    from,
    when,
    motionRef,
    motionCmpt: motionCmptProp,
  } = props
  const position = from ? positionByFrom[from] : asIs
  const MotionCmpt = motionCmptProp || motion.div
  return (
    <AnimatePresence>
      {when && (
        <MotionCmpt
          className={className}
          initial={{ opacity: 0, ...position.initial }}
          animate={{ opacity: 1, ...position.animate }}
          exit={{ opacity: 0, ...position.initial }}
          transition={{ duration: jsFriendly.transitionDurSeconds }}
          ref={motionRef}
        >
          {children}
        </MotionCmpt>
      )}
    </AnimatePresence>
  )
}

function getPositionByFrom() {
  return {
    top: {
      initial: { y: '-50px' },
      animate: { y: '0px' },
    },
    bottom: {
      initial: { y: '50px' },
      animate: { y: '0px' },
    },
    left: {
      initial: { x: '-50px' },
      animate: { x: '0px' },
    },
    right: {
      initial: { x: '50px' },
      animate: { x: '0px' },
    },
  }
}

export default Appear
