export default precision => {
  const numPrecision = precision.includes('.')
    ? precision.length - 2 // 2 accounts for the leading "0."
    : -precision.length + 1

  return aNumber => {
    /**
     * implementation based off lodash.  Essentially we're
     *   1. shifting the exponent based off the precision passed
     *   2. rounding the shifted result
     *   3. shifting it back and returning the value
     *
     * per lodash this gets around pesky floating point issues
     */
    const [base, exp] = aNumber.toExponential().split('e')
    const shiftedNum = Math.round(base + 'e' + (Number(exp) + numPrecision))

    const [shiftedBase, shiftedExp] = shiftedNum.toExponential().split('e')
    return Number(shiftedBase + 'e' + (Number(shiftedExp) - numPrecision))
  }
}
