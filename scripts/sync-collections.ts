import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {getCollections, updateCollection} from '../api/collection'
import {getPosts} from '../utils/fs'
import {groupPostsByPrimaryTag, getUniquePostsTags} from '../utils/post'

import '../sentry.server.config'

interface CollectionsMap {
  [key: string]: {
    tags: Array<string>
    slugs: Array<string>
  }
}

function getCollectionsMap(): CollectionsMap {
  const posts = getPosts()
  const groupedPosts = groupPostsByPrimaryTag(posts)

  return Object.keys(groupedPosts).reduce((res, slug) => {
    return {
      ...res,
      [slug]: {
        tags: getUniquePostsTags(groupedPosts[slug]),
        slugs: groupedPosts[slug].map((post) => post.slug)
      }
    }
  }, {})
}

async function sync() {
  const collectionsMap = getCollectionsMap()

  const collections = await getCollections()

  const collectionsToUpdate = collections.filter(
    (collection) => collectionsMap[collection.title]
  )

  return await Promise.all(
    collectionsToUpdate.map((collection) =>
      updateCollection(collection.id, collectionsMap[collection.title])
    )
  )

  return []
}

logger.setLevel('info')

sync()
  .then((collections) =>
    logger.info(`🎉 Successfully synced ${collections.length} collections`)
  )
  .catch((error) => Sentry.captureException(error))
