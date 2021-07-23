import util from 'util'
import fs from 'fs-extra'

const writeFile = util.promisify(fs.writeFile)

export function serializeToFile(
  filePath: string,
  data: any,
  options = {}
): Promise<unknown> {
  // @ts-ignore
  return writeFile(filePath, JSON.stringify(data, null, 2), options)
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