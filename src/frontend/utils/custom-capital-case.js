import { capitalCase } from 'change-case'

const alphaCharRe = /^[a-zA-Z]$/

const customCapitalCase = str => {
  return parseParts(str)
    .map(p => {
      return alphaCharRe.test(p[0]) ? capitalCase(p) : p
    })
    .join('')
}

const parseParts = str => {
  const parts = []
  let isPrevAlphaChar = false
  let curPart = ''

  for (const c of str) {
    const isAlphaChar = alphaCharRe.test(c)

    if (isPrevAlphaChar === isAlphaChar) {
      curPart += c
    } else {
      parts.push(curPart)
      curPart = c
      isPrevAlphaChar = isAlphaChar
    }
  }

  parts.push(curPart)
  return parts.filter(Boolean)
}

export default customCapitalCase
