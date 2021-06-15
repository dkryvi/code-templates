import util from 'util'
import fs from 'fs-extra'

const writeFile = util.promisify(fs.writeFile)

import {getAllPosts} from '../lib/api'

const outDirPath = '.content'
const homeDir = 'home'

export const build = async (): Promise<void> => {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'tags',
    'coverImage',
    'excerpt'
  ])

  const path = `${outDirPath}/${homeDir}`
  fs.ensureDirSync(path)

  // @ts-ignore
  await writeFile(`${path}/config.json`, JSON.stringify({posts}, null, 2))
}

build()
