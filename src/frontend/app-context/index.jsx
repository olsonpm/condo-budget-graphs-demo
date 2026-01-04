import { createContext } from 'react'
import useOptions from './use-options'
import useToggleableLines from './use-toggleable-lines'

const AppCtx = createContext()

const AppContext = ({ children, hasCompareYears }) => {
  const options = useOptions({ hasCompareYears })
  const toggleableLines = useToggleableLines()
  const graphType = hasCompareYears ? 'compare' : 'simple'
  const value = { graphType, hasCompareYears, ...options, ...toggleableLines }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export default AppContext
export { AppCtx }
