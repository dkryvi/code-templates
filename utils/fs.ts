import util from 'util'

import fs from 'fs-extra'

const writeFile = util.promisify(fs.writeFile)

export function serializeToFile(
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: any,
  options = {}
): Promise<unknown> {
  // @ts-ignore
  return writeFile(filePath, JSON.stringify(data, null, 2), options)
}
