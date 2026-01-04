import { pWaitMs } from 'common-fp'
import { jsFriendly } from './style-vars'

const { transitionDurMs, transitionDurSlowMs } = jsFriendly

const waitAnimationDur = () => pWaitMs(transitionDurMs)
const waitAnimationDurSlow = () => pWaitMs(transitionDurSlowMs)

export { waitAnimationDur, waitAnimationDurSlow }
