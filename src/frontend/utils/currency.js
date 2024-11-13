const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const format = val => currency.format(val)
const formatCompact = val => {
  const full = currency.format(val)

  if (full.endsWith(',000')) return full.replace(/,000$/, 'K')
  if (/,\d00$/.test(full)) return full.replace(/,(\d)00$/, '.$1K')
  return full
}

export default { format, formatCompact }
