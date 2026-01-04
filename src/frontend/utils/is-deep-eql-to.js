import deepEql from 'deep-eql'

const isDeepEqlTo = left => right => deepEql(left, right)

export default isDeepEqlTo
