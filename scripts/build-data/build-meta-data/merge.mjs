import {
  alter,
  discard,
  flattenOnce,
  get,
  invert,
  mapKeys,
  mapValues,
  order,
  passThrough,
  swapFirstTwoArgs as byKey,
  withStringsAscending,
} from 'common-fp'

/**
 * gets all the line items for the year
 */
const merge = lineItemsByMonth => {
  const allArray = passThrough(lineItemsByMonth, [
    mapValues(get('all')),
    Object.values,
    flattenOnce,
    arr => [...new Set(arr)],
    order(withStringsAscending),
  ])
  const allIdByNum = allArray.reduce(toIdByNum, {})
  const allNumById = invert(allIdByNum)

  const byCategory = passThrough(lineItemsByMonth, [
    alter(mergeAllByCategory, makeEmptyObj),
    mapValues(order(withStringsAscending)),
  ])

  const all = {
    array: allArray,
    idByNum: allIdByNum,
    categoryByNum: passThrough(byCategory, [
      invertFromArray,
      mapKeys(byKey(k => allNumById[k])),
    ]),
  }

  return { all, byCategory }
}

function mergeAllByCategory(result, { byCategory }) {
  for (const [catName, catData] of Object.entries(byCategory)) {
    if (!result[catName]) result[catName] = catData
    else {
      const curItems = result[catName]
      const itemsToAdd = discard(curItems)(catData)
      result[catName].push(...itemsToAdd)
    }
  }

  return result
}

function makeEmptyObj() {
  return {}
}

function toIdByNum(res, id) {
  const [num] = id.split('  ')
  res[num] = id
  return res
}

function invertFromArray(obj) {
  const res = {}
  for (const [category, lineItemArr] of Object.entries(obj)) {
    for (const lineItemId of lineItemArr) {
      res[lineItemId] = category
    }
  }
  return res
}

export default merge
