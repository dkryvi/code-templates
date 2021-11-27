import {CollectionDictionary} from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {updateCollection} from '../api/collection'
import {getCollectionDictionaries} from '../api/collection-dictionary'
import {COLLECTION_IMAGE_FALLBACK} from '../config'
import prisma from '../lib/prisma'
import {getPosts} from '../utils/fs'
import {
  groupPostsByPrimaryTag,
  getUniquePostsTags,
  GroupedPosts
} from '../utils/post'

import '../sentry.server.config'

function createCollections(
  groupedPosts: GroupedPosts,
  collectionDictionary: Array<CollectionDictionary>
) {
  return Object.keys(groupedPosts).map((title) => {
    const dictionary = collectionDictionary.find(
      (dictionaryItem) => dictionaryItem.title === title
    )

    return {
      title,
      excerpt: dictionary?.excerpt,
      image: dictionary?.image ?? COLLECTION_IMAGE_FALLBACK,
      tags: getUniquePostsTags(groupedPosts[title]),
      slugs: groupedPosts[title].map((post) => post.slug)
    }
  })
}

async function sync() {
  const posts = getPosts()
  const groupedPosts = groupPostsByPrimaryTag(posts)
  const collectionDictionary = await getCollectionDictionaries()

  const collections = createCollections(groupedPosts, collectionDictionary)

  await prisma.collection.deleteMany()

  return await Promise.all(
    collections.map(async function (collection) {
      return await updateCollection({
        where: {title: collection.title},
        create: collection,
        update: collection
      })
    })
  )
}

logger.setLevel('info')

sync()
  .then((collections) =>
    logger.info(`🎉 Successfully synced ${collections.length} collections`)
  )
  .catch((error) => Sentry.captureException(error))
  .finally(() => prisma.$disconnect())
