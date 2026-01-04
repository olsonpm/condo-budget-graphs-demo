const clampTo = (min, max) => num => {
  return Math.min(Math.max(num, min), max)
}

export default clampTo
