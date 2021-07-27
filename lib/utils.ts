import util from 'util'
import fs from 'fs-extra'
import {join} from 'path'

import {CONTENT_FOLDER, SETTINGS_FOLDER} from './constants'

const writeFile = util.promisify(fs.writeFile)

const readJson = util.promisify(fs.readJson)

export function serializeToFile(
  filePath: string,
  data: any,
  options = {}
): Promise<unknown> {
  // @ts-ignore
  return writeFile(filePath, JSON.stringify(data, null, 2), options)
}

const contentDirectory = join(process.cwd(), CONTENT_FOLDER)

export function getContentData(file: string): Promise<any> {
  return new Promise((resolve, reject) =>
    // @ts-ignore
    readJson(`${contentDirectory}/${file}.json`).then(resolve).catch(reject)
  )
}

const settingsDirectory = join(process.cwd(), SETTINGS_FOLDER)

export function getSettings(file: string): Promise<any> {
  return new Promise((resolve, reject) =>
    // @ts-ignore
    readJson(`${settingsDirectory}/${file}.json`).then(resolve).catch(reject)
  )
}

export function intersection<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  const [longer, shorter] =
    arr2.length > arr1.length ? [arr2, arr1] : [arr1, arr2]

  return longer.reduce((res: Array<T>, item: T) => {
    if (shorter.includes(item)) {
      return [...res, item]
    }

    return res
  }, [])
}
