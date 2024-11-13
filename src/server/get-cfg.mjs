import fsp from 'node:fs/promises'
import path from 'node:path'

const configJson = path.resolve(import.meta.dirname, '../config/server.json')

export default async () => JSON.parse(await fsp.readFile(configJson))
