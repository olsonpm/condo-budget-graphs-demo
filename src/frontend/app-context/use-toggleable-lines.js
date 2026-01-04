import { useState } from 'react'

const useToggleableLines = () => {
  const [availableLines, setAvailableLines] = useState([])
  const [activeLines, setActiveLines] = useState([])

  return {
    availableLines,
    setAvailableLines,
    activeLines,
    setActiveLines,
  }
}

export default useToggleableLines
