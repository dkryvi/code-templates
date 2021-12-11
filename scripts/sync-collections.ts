require('dotenv').config()

import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {getCollections, updateCollection} from '../api/collection'
import {getPosts} from '../utils/fs'
import {getPostsMap, getUniquePostsTags} from '../utils/post'

import '../sentry.server.config'

interface CollectionsMap {
  [key: string]: {
    tags: Array<string>
    slugs: Array<string>
  }
}

function getCollectionsMap(): CollectionsMap {
  const postsMap = getPostsMap(getPosts())

  return Object.keys(postsMap).reduce((res, key) => {
    const posts = postsMap[key];

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
  const collectionsMap = getCollectionsMap()
  console.log({collections})


  return await Promise.all(
    collections
    .filter(collection => collectionsMap[collection.title])
    .map((collection) =>
      updateCollection(collection.id, collectionsMap[collection.title])
    )
  )
}

logger.setLevel('info')

sync()
  .then((collections) => logger.info(`🎉 Successfully synced ${collections.length} collections`)
  )
  .catch((error) => Sentry.captureException(error))
