import { capitalCase } from 'change-case'
import { currency } from '@/utils'
import { useBreakpoint } from '@/common-hooks'

const useResponsiveAxis = () => {
  const bp = useBreakpoint()

  return {
    axisBottom: {
      format: capitalCase,
      legend: 'Month',
      legendPosition: 'middle',
      ...getResponsiveAxisBottom()[bp],
    },
    axisLeft: {
      legend: 'Amount',
      legendPosition: 'middle',
      ...getResponsiveAxisLeft()[bp],
    },
  }
}

function getResponsiveAxisBottom() {
  const tabletAndLarger = {
    legendOffset: 90,
  }

  return {
    mobileSmall: {
      legendOffset: 60,
    },
    mobile: {
      legendOffset: 70,
    },
    tablet: tabletAndLarger,
    desktop: tabletAndLarger,
  }
}

function getResponsiveAxisLeft() {
  const tabletAndLarger = {
    format: currency.format,
    legendOffset: -140,
  }

  return {
    mobileSmall: {
      format: currency.formatCompact,
      legendOffset: -70,
    },
    mobile: {
      format: currency.formatCompact,
      legendOffset: -90,
    },
    tablet: tabletAndLarger,
    desktop: tabletAndLarger,
  }
}

export default useResponsiveAxis
