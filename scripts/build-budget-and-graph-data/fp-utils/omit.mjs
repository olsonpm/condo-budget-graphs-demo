export default keys => {
  const setOfKeys = new Set(keys)

  return obj => {
    const result = {}

    for (const k of Object.keys(obj)) {
      if (!setOfKeys.has(k)) result[k] = obj[k]
    }

    return result
  }
}
