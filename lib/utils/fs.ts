import util from 'util'
import fs from 'fs-extra'
import {join} from 'path'

import {CONTENT_FOLDER, SETTINGS_FOLDER} from '../constants'

const writeFile = util.promisify(fs.writeFile)
const readJson = util.promisify(fs.readJson)

const contentDirectory = join(process.cwd(), CONTENT_FOLDER)
const settingsDirectory = join(process.cwd(), SETTINGS_FOLDER)

export function serializeToFile(
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: any,
  options = {}
): Promise<unknown> {
  // @ts-ignore
  return writeFile(filePath, JSON.stringify(data, null, 2), options)
}

export function getContentData(file: string): Promise<any> {
  return new Promise((resolve, reject) =>
    // @ts-ignore
    readJson(`${contentDirectory}/${file}.json`).then(resolve).catch(reject)
  )
}

export function getSettings(file: string): Promise<any> {
  return new Promise((resolve, reject) =>
    // @ts-ignore
    readJson(`${settingsDirectory}/${file}.json`).then(resolve).catch(reject)
  )
}
