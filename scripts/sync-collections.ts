import * as Sentry from '@sentry/nextjs'
import groupBy from 'lodash.groupby'
import partition from 'lodash.partition'
import logger from 'loglevel'

import {
  createCollection,
  getCollections,
  updateCollection
} from '../api/collection'
import {normalize} from '../utils/array'
import {getPosts} from '../utils/fs'
import {getUniquePostsTags} from '../utils/post'

import '../sentry.server.config'

interface CollectionsMap {
  [key: string]: {
    tags: Array<string>
    slugs: Array<string>
  }
}

function getCollectionsMap(): CollectionsMap {
  const posts = getPosts()
  const groupedPosts = groupBy(posts, 'collection')

  return Object.keys(groupedPosts).reduce((res, key) => {
    const posts = groupedPosts[key]

    return {
      ...res,
      [key]: {
        tags: getUniquePostsTags(posts),
        slugs: posts.map((post) => post.slug)
      }
    }
  }, {})
}

async function sync() {
  const collections = await getCollections()
  const normalizedCollections = normalize(collections, 'title')
  const collectionsMap = getCollectionsMap()

  const [existingKeys, newKeys] = partition(
    Object.keys(collectionsMap),
    (key) => normalizedCollections[key]
  )

  const updatePromises = existingKeys.map((key) => {
    const collection = normalizedCollections[key]

    return updateCollection(collection.id, collectionsMap[key])
  })

  const createPromises = newKeys.map((key) =>
    createCollection(key, collectionsMap[key])
  )

  return Promise.all([Promise.all(updatePromises), Promise.all(createPromises)])
}

logger.setLevel('info')

sync()
  .then(([updatedCollections, newCollections]) => {
    logger.info(
      `🎉 Successfully synced ${updatedCollections.length} collections`
    )

    if (newCollections.length > 0) {
      logger.info(
        `🎉 Successfully created ${newCollections.length} collections`
      )
    }
  })
  .catch((error) => Sentry.captureException(error))
