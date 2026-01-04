import fsp from 'node:fs/promises'
import path from 'node:path'
import { replaceFirstMatch } from 'common-fp'
import { deleteAsync } from 'del'
import { makeDirectory } from 'make-dir'

const dir = {
  dataBuilt: fromRoot('data/built'),
  dataSrc: fromRoot('data/src'),
}

const cleanDirectory = async dpath => {
  await deleteAsync(dpath)
  await makeDirectory(dpath)
}

const fileExists = async fpath => {
  try {
    await fsp.stat(fpath)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
    throw err
  }
}

function fromRoot(fpath) {
  return path.resolve(import.meta.dirname, '..', fpath)
}

function getMonthNum(monthId) {
  return parseInt(monthId.split('-')[0])
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

const isDemo = process.env.IS_DEMO === 'true'

const isHiddenFile = fpath => {
  const basename = path.basename(fpath)
  return basename.startsWith('.')
}

const readFile = async fpath => {
  try {
    return await fsp.readFile(fpath, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') return
    else throw err
  }
}

const extRe = /\.[^.]*$/
const removeExt = replaceFirstMatch(extRe, '')

export {
  cleanDirectory,
  dir,
  fileExists,
  fromRoot,
  getMonthNum,
  getRandomFloat,
  getRandomInt,
  isDemo,
  isHiddenFile,
  readFile,
  removeExt,
}
