export default fn => obj => {
  const result = {}

  for (const [key, val] of Object.entries(obj)) {
    result[key] = fn(val, key, obj)
  }

  return result
}
