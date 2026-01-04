import { createContext } from 'react'
import useOptions from './use-options'

const MonthCtx = createContext()

const MonthContext = ({ children }) => {
  const options = useOptions()

  return <MonthCtx.Provider value={options}>{children}</MonthCtx.Provider>
}

export default MonthContext
export { MonthCtx }
