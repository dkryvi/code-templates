import dotenv from 'dotenv'
import logger from 'loglevel'

import {getPosts} from '../lib/api'
import {buildSearch} from './build-search'
import {buildCollections} from './build-collections'

async function build() {
  const posts = getPosts()

  await buildSearch({posts})
  await buildCollections({posts})
  logger.info('🎉🎉🎉Finished all build stages🎉🎉🎉')
}

try {
  dotenv.config()
  logger.setLevel('info')

  build()
} catch (error) {
  logger.error(error)
}
