import dedent from 'dedent'
import {
  discardWhen,
  find,
  joinValues,
  mapValues,
  passThrough,
} from 'common-fp'
import entriesToIgnore from './data.mjs'

const entries = Object.entries
const allEntries = compileAllEntries()
const ignoredEntries = new Set()

const assertAllEntriesWereIgnored = () => {
  const leftoverEntries = passThrough(allEntries, [
    discardWhen((_v, entry) => ignoredEntries.has(entry)),
    mapValues((c, e) => {
      return `${c.year}.${c.monthId}.${c.category}.${c.lineItem}: [${e.amount}, ${e.description}]`
    }),
    joinValues('\n'),
  ])
  if (leftoverEntries) {
    const msg = dedent(`
      There are leftover entries which weren't ignored.  This means the
      spreadsheets have changed and we need to update our ignore entries data.

      leftover entries:
    `)
    throw new Error(`${msg}\n${leftoverEntries}`)
  }
}

const shouldIgnoreEntry = argObj => {
  const { year, monthId, category, lineItem, amount, description } = argObj
  const entries = entriesToIgnore[year]?.[monthId]?.[category]?.[lineItem]
  if (!entries) return false

  const entryToIgnore = find(entryMatches({ amount, description }))(entries)
  if (!entryToIgnore) return false

  ignoredEntries.add(entryToIgnore)
  return true
}

function entryMatches(obj1) {
  return obj2 => {
    if (ignoredEntries.has(obj2)) return false
    for (const [k, v] of entries(obj1)) {
      if (obj2[k] !== v) return false
    }
    return true
  }
}

function compileAllEntries() {
  const res = new Map()
  for (const [year, yv] of entries(entriesToIgnore)) {
    for (const [monthId, mv] of entries(yv)) {
      for (const [category, cv] of entries(mv)) {
        for (const [lineItem, ignoreEntries] of entries(cv)) {
          for (const entry of ignoreEntries) {
            res.set(entry, { year, monthId, category, lineItem })
          }
        }
      }
    }
  }
  return res
}

export { assertAllEntriesWereIgnored, shouldIgnoreEntry }
