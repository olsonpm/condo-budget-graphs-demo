import useBreakpoint from './use-breakpoint'

const breakpointToViewportSize = {
  mobileSmall: {
    isMobileSmall: true,
    isMobileAndSmaller: true,
    isTabletAndSmaller: true,
  },
  mobile: {
    isMobile: true,
    isMobileAndSmaller: true,
    isTabletAndSmaller: true,
    isMobileAndLarger: true,
  },
  tablet: {
    isTablet: true,
    isTabletAndSmaller: true,
    isMobileAndLarger: true,
    isTabletAndLarger: true,
  },
  desktop: {
    isDesktop: true,
    isMobileAndLarger: true,
    isTabletAndLarger: true,
  },
}

const useViewportSize = () => {
  const breakpoint = useBreakpoint('desktop')

  return breakpointToViewportSize[breakpoint]
}

export default useViewportSize
