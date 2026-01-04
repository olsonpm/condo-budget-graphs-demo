import queryString from 'query-string'

const commonOpts = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
  sort: false,
}

const parse = val => queryString.parse(val, commonOpts)
const stringify = val => queryString.stringify(val, commonOpts)

export { parse, stringify }
