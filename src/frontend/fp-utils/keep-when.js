export default predicate => obj => {
  const res = {}

  for (const [k, v] of Object.entries(obj)) {
    if (predicate(v, k, obj)) res[k] = v
  }
  return res
}
