import { capitalCase } from 'change-case'

const alphaCharRe = /^[a-zA-Z]$/
const knownAcronyms = new Set(['LLC'])

const customCapitalCase = str => {
  return parseParts(str)
    .map(p => {
      return shouldPerformCapitalCase(p) ? capitalCase(p) : p
    })
    .join('')
}

const parseParts = str => {
  const parts = []
  let isPrevCharAlpha = false
  let isAlphaChar = alphaCharRe.test(str[0])
  let curPart = ''

  for (let i = 0; i < str.length; i += 1) {
    const c = str[i]
    const isNextCharAlpha = alphaCharRe.test(str[i + 1])

    if (isPrevCharAlpha === isAlphaChar) {
      curPart += c
    } else if (isPrevCharAlpha && c === '*' && isNextCharAlpha) {
      parts.push(curPart)
      curPart = ', '
    } else {
      parts.push(curPart)
      curPart = c
    }
    isPrevCharAlpha = isAlphaChar
    isAlphaChar = isNextCharAlpha
  }

  parts.push(curPart)
  return parts.filter(Boolean)
}

function shouldPerformCapitalCase(part) {
  const startsWithLetter = alphaCharRe.test(part[0])
  const isNotAcronym = !knownAcronyms.has(part)

  return startsWithLetter && isNotAcronym
}

export default customCapitalCase
