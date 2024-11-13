export default async obj => {
  const keys = Object.keys(obj)
  const values = await Promise.all(Object.values(obj))
  const result = {}

  for (let i = 0; i < values.length; i += 1) result[keys[i]] = values[i]

  return result
}
