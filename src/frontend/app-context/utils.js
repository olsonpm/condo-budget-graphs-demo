const isFullySelected = ({ year, category, item, dataType }) => {
  if (!year) return false

  return (
    category === 'Reserve' ||
    (category === 'Total Expenses' && dataType) ||
    (category && item && dataType)
  )
}

export { isFullySelected }
