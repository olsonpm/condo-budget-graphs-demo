const compareByManyProps = (keys, compareFn) => (left, right) => {
  if (!keys?.length)
    throw new Error('compareByManyProps requires a laden array')

  let result
  for (const k of keys) {
    const leftVal = left?.[k]
    const rightVal = right?.[k]

    // spec defines how to handle undefined here
    // https://tc39.es/ecma262/#sec-comparearrayelements
    if (leftVal === undefined && rightVal === undefined) return 0
    if (leftVal === undefined) return 1
    if (rightVal === undefined) return -1

    result = compareFn(leftVal, rightVal)
    if (result !== 0) return result
  }

  return 0
}

export default compareByManyProps
