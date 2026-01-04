/**
 * This addresses an issue I had with vite, where hmr would trip on me removing
 * the built directory.  So here we update the files in place and clean up any
 * files that aren't supposed to be there.  Vite's dev environment is happy
 * with this.
 */

import { deleteAsync } from 'del'
import cpy from 'cpy'
import { makeDirectory } from 'make-dir'
import { discard } from 'common-fp'
import fsp from 'node:fs/promises'
import { dir, fromRoot } from '../utils.mjs'

const appReadyFnames = ['calculated-report.json', 'graph.json', 'meta.json']

const appReadyDir = fromRoot('data/app-ready')

const buildAppReadyData = async () => {
  await makeDirectory(appReadyDir)
  const existingFnames = await fsp.readdir(appReadyDir)
  const getFilesToDelete = discard(appReadyFnames)
  const filesToDelete = getFilesToDelete(existingFnames)
  await Promise.all([
    deleteAsync(filesToDelete, { cwd: appReadyDir }),
    cpy(appReadyFnames, '../app-ready', {
      cwd: dir.dataBuilt,
    }),
  ])
}

export default buildAppReadyData
