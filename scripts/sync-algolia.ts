import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {getCollections} from '../api/collection'
import algolia from '../lib/algolia'
import {AlgoliaPost, AlgoliaCollection} from '../types'
import {getPosts} from '../utils/fs'
import {toSlugCase} from '../utils/string'
import '../sentry.server.config'

async function syncPosts() {
  const posts = getPosts()

  const algoliaPosts: Array<AlgoliaPost> = posts.map((post) => ({
    objectID: post.slug,
    slug: post.slug,
    title: post.title,
    tags: post.tags,
    image: post.coverImage,
    author_name: post.author.name,
    author_image: post.author.image,
    excerpt: post.excerpt
  }))

  console.log({algoliaPosts})

  const result = await algolia
    .initIndex('posts')
    .partialUpdateObjects(algoliaPosts, {
      createIfNotExists: true
    })

  console.log({result})

  logger.info(
    `🎉 Sucessfully synced ${result.objectIDs.length} posts to Algolia search.`
  )
}

async function syncCollections() {
  const collections = await getCollections()

  const algoliaCollections: Array<AlgoliaCollection> = collections.map(
    (collection) => ({
      objectID: collection.id,
      slug: toSlugCase(collection.title),
      tags: collection.tags,
      title: collection.title,
      image: collection.image,
      excerpt: collection.excerpt,
      slugs: collection.slugs
    })
  )

  const result = await algolia
    .initIndex('collections')
    .partialUpdateObjects(algoliaCollections, {
      createIfNotExists: true
    })

  logger.info(
    `🎉 Sucessfully synced ${result.objectIDs.length} collections to Algolia search.`
  )
}

async function sync() {
  logger.setLevel('info')

  try {
    await Promise.all([syncPosts(), syncCollections()])
  } catch (error) {
    Sentry.captureException(error)
  }
}
sync()
