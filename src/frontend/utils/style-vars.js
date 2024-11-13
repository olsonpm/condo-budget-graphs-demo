import roundToNearest from './round-to-nearest.js'

const roundToNearestTenth = roundToNearest('0.1')

const contentSizePx = 1200
const contentSize = `${contentSizePx}px`
const transitionDurSeconds = 0.2
const transitionDur = `${transitionDurSeconds}s`

/**
 * custom breakpoints
 * 1200+ desktop
 * 900-1199 tablet
 * 600-899 mobile
 * 599- mobile small
 */

const desktopMinPx = contentSizePx
const tabletMaxPx = roundToNearestTenth(desktopMinPx - 0.1)
const tabletMinPx = 900
const mobileMaxPx = roundToNearestTenth(tabletMinPx - 0.1)
const mobileMinPx = 600
const mobileSmallMaxPx = roundToNearestTenth(mobileMinPx - 0.1)

const bp = {
  'desktop-min': `${desktopMinPx}px`,
  'tablet-max': `${tabletMaxPx}px`,
  'tablet-min': `${tabletMinPx}px`,
  'mobile-max': `${mobileMaxPx}px`,
  'mobile-min': `${mobileMinPx}px`,
  'mobile-small-max': `${mobileSmallMaxPx}px`,
}

const styleVariables = {
  contentSize,
  transitionDur,
  ...bp,
}

const jsFriendly = {
  contentSizePx,
  transitionDurSeconds,
  bp: {
    desktopMin: desktopMinPx,
    tabletMax: tabletMaxPx,
    tabletMin: tabletMinPx,
    mobileMax: mobileMaxPx,
    mobileMin: mobileMinPx,
    mobileSmallMax: mobileSmallMaxPx,
  },
}

export default styleVariables
export { jsFriendly }
