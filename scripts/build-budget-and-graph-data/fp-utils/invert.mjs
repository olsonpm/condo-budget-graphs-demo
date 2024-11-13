export default obj => {
  const res = {}
  for (const [k, v] of Object.entries(obj)) res[v] = k
  return res
}
