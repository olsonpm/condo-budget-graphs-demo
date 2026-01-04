import { useEffect, useLayoutEffect, useState } from 'react'

import { jsFriendly } from '@/utils/style-vars'

const breakpoints = {
  mobileSmall: 0,
  mobile: jsFriendly.bp.mobileMin,
  tablet: jsFriendly.bp.tabletMin,
  desktop: jsFriendly.bp.desktopMin,
}

const breakpointsDesc = Object.entries(breakpoints).sort((l, r) => {
  return r[1] - l[1]
})

const useBreakpoint = defaultBp => {
  const width = useWindowWidth()
  const [bp, setBp] = useState(defaultBp)

  useEffect(() => {
    const curBp = getBreakpoint(width)
    if (bp !== curBp) setBp(curBp)
  }, [width, bp])

  return bp
}

function getBreakpoint(width) {
  for (const [name, min] of breakpointsDesc) {
    if (width >= min) return name
  }
}

function useWindowWidth() {
  const [width, setWidth] = useState([0, 0])
  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateWidth)
    updateWidth()
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  return width
}

export default useBreakpoint
