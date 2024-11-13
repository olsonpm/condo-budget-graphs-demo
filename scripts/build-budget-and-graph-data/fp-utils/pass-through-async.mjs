export default async (val, fnArray) => {
  let result = val
  for (const fn of fnArray) result = await fn(result)

  return result
}
