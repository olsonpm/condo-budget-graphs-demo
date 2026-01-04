import roundToNearest from 'common-fp/round-to-nearest'

const roundToNearestTenth = roundToNearest('0.1')

const contentSizePx = 1200
const contentSize = `${contentSizePx}px`
const transitionDurSeconds = 0.2
const transitionDurSlowSeconds = 0.4
const transitionDurMs = transitionDurSeconds * 1000
const transitionDurSlowMs = transitionDurSlowSeconds * 1000
const transitionDur = `${transitionDurSeconds}s`
const transitionDurSlow = `${transitionDurSlowSeconds}s`

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
  transitionDurSlow,
  ...bp,
}

const jsFriendly = {
  contentSizePx,
  transitionDurSeconds,
  transitionDurSlowSeconds,
  transitionDurMs,
  transitionDurSlowMs,
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
