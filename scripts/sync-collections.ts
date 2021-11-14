import {CollectionDictionary} from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {getPosts} from '../api'
import prisma from '../lib/prisma'
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
      coverImage: dictionary?.coverImage,
      tags: getUniquePostsTags(groupedPosts[title]),
      slugs: groupedPosts[title].map((post) => post.slug)
    }
  })
}

async function sync() {
  await prisma.$connect()

  const posts = await getPosts()
  const groupedPosts = groupPostsByPrimaryTag(posts)
  const collectionDictionary = await prisma.collectionDictionary.findMany()

  const collections = createCollections(groupedPosts, collectionDictionary)

  return await Promise.all(
    collections.map(async function (collection) {
      return await prisma.collection.upsert({
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
