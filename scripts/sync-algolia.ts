import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import {getCollectionsWithAllRelative} from '../api/collection'
import {getPostsWithAllRelative} from '../api/post'
import {AlgoliaPost, AlgoliaCollection} from '../domain/types'
import algolia from '../lib/algolia'
import '../sentry.server.config'

async function syncPosts() {
  const posts = await getPostsWithAllRelative()

  const algoliaPosts: Array<AlgoliaPost> = posts.map((post) => ({
    objectID: post.slug,
    slug: post.slug,
    tags: post.tags?.map((tag) => tag.slug),
    title: post.title,
    image: post.imageUrl,
    author_name: post?.author?.name,
    author_image: post?.author?.imageUrl,
    excerpt: post.excerpt
  }))

  const result = await algolia
    .initIndex('posts')
    .partialUpdateObjects(algoliaPosts, {
      createIfNotExists: true
    })

  logger.info(
    `🎉 Sucessfully synced ${result.objectIDs.length} posts to Algolia search.`
  )
}

async function syncCollections() {
  const collections = await getCollectionsWithAllRelative()

  const algoliaCollections: Array<AlgoliaCollection> = collections.map(
    (collection) => ({
      objectID: collection.slug,
      slug: collection.slug,
      tags: collection.tags?.map((tag) => tag.slug),
      title: collection.title,
      image: collection.imageUrl,
      excerpt: collection.excerpt,
      slugs: collection.posts?.map((post) => post.slug)
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
