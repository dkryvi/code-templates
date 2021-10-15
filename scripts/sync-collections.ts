import {CollectionDictionary} from '@prisma/client'
import logger from 'loglevel'

import {getPosts} from '../api'
import prisma from '../lib/prisma'
import {
  groupPostsByPrimaryTag,
  getUniquePostsTags,
  GroupedPosts
} from '../utils/post'

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

async function syncCollections() {
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

try {
  logger.setLevel('info')
  syncCollections().then((collections) => {
    logger.info(`🎉 Successfully synced ${collections.length} collections`)
  })
} catch (error) {
  console.log({error})
  // TODO: use some tool to track errors
  throw error
} finally {
  prisma.$disconnect()
}
