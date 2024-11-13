export default fn => {
  return resultOfPreviousFunction => {
    fn(resultOfPreviousFunction)

    return resultOfPreviousFunction
  }
}
