import deepMerge from 'deepmerge'
import { useBreakpoint } from '@/common-hooks'
import commonTheme from './common'
import mobileSmall from './mobile-small-theme'
import mobile from './mobile-theme'
import tabletAndLarger from './tablet-and-larger-theme'

const useResponsiveTheme = () => {
  const bp = useBreakpoint()

  const theme = {
    mobileSmall,
    mobile,
    tablet: tabletAndLarger,
    desktop: tabletAndLarger,
  }

  return bp ? deepMerge(commonTheme, theme[bp]) : commonTheme
}

export default useResponsiveTheme
