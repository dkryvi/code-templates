import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {getCollectionsWithTags} from '../api/collection'
import {getPostsWithTags} from '../api/post'
// import prisma from '../lib/prisma'

import '../sentry.server.config'

async function sync() {
  const collections = await getCollectionsWithTags()
  const postsWithTags = await getPostsWithTags()

  // TODO: update collection tags based on similar post tags

  return []
}

logger.setLevel('info')

sync()
  .then(() => logger.info('🎉 Successfully synced  collections'))
  .catch((error) => Sentry.captureException(error))
