import dotenv from 'dotenv'
import logger from 'loglevel'
import fs from 'fs-extra'

import {CONTENT_FOLDER} from '../lib/constants'
import {getPosts} from '../lib/api'
import {buildSearch} from './build-search'
import {buildCollections} from './build-collections'

async function build() {
  const posts = getPosts()

  const contentOutputPath = `${process.cwd()}/${CONTENT_FOLDER}`

  fs.ensureDirSync(contentOutputPath)

  await buildSearch({posts})
  await buildCollections({posts, outputPath: contentOutputPath})
  logger.info('🎉🎉🎉Finished all build stages🎉🎉🎉')
}

try {
  dotenv.config()
  logger.setLevel('info')

  build()
} catch (error) {
  logger.error(error)
}
