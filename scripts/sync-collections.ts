import logger from 'loglevel'

import {prisma, getPosts} from '../api'
import {groupPostsByPrimaryTag, getUniquePostsTags} from '../utils/post'

async function build() {
  logger.setLevel('info')
  await prisma.$connect()

  const posts = getPosts()
  const groupedPosts = groupPostsByPrimaryTag(posts)

  const collectionsDictionaries = await prisma.collectionDictionary.findMany()
  const collections = Object.keys(groupedPosts).map((title) => {
    const dictionary = collectionsDictionaries.find(
      (dictionary) => dictionary.title === title
    )

    return {
      title,
      excerpt: dictionary?.excerpt,
      coverImage: dictionary?.coverImage,
      tags: getUniquePostsTags(groupedPosts[title]),
      slugs: groupedPosts[title].map((post) => post.slug)
    }
  })

  const dbCollections = await prisma.collection.findMany()

  for (const collection of collections) {
    const dbCollection = dbCollections.find(
      (dbCollection) => dbCollection.title === collection.title
    )

    if (dbCollection) {
      await prisma.collection.update({
        where: {id: dbCollection.id},
        data: collection
      })
    } else {
      await prisma.collection.create({
        data: collection
      })
    }
  }

  logger.info(`🎉 Successfully synced ${collections.length} collections`)
}

build()
