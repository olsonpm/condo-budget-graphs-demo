export default (val, fnArray) => {
  return fnArray.reduce((result, fn) => fn(result), val)
}
