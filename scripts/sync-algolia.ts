import {Collection} from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import dotenv from 'dotenv'
import logger from 'loglevel'

import {getCollections} from '../api/collection'
import algolia from '../lib/algolia'
import {AlgoliaPost, AlgoliaCollection, Post} from '../types'
import {getPosts} from '../utils/fs'
import {toSlugCase} from '../utils/string'
import '../sentry.server.config'

function transformPostsToSearchObjects(posts: Array<Post>) {
  return posts.map((post, index): AlgoliaPost => {
    return {
      objectID: `${post.slug}-${index}`,
      slug: post.slug,
      title: post.title,
      tags: post.tags,
      image: post.coverImage,
      author_name: post.author.name,
      author_image: post.author.image,
      excerpt: post.excerpt
    }
  })
}

async function syncPosts() {
  const posts = getPosts()
  const transformed = transformPostsToSearchObjects(posts)

  return await algolia
    .initIndex('posts')
    // @ts-ignore
    .replaceAllObjects(transformed, {safe: true})
}

function transformCollectionsToSearchObjects(collections: Array<Collection>) {
  return collections.map((collection, index): AlgoliaCollection => {
    const slug = toSlugCase(collection.title)

    return {
      objectID: `${slug}-${index}`,
      slug,
      tags: collection.tags,
      title: collection.title,
      image: collection.image,
      excerpt: collection.excerpt,
      slugs: collection.slugs
    }
  })
}

async function syncCollections() {
  const collections = await getCollections()
  const transformed = transformCollectionsToSearchObjects(collections)

  return await algolia
    .initIndex('collections')
    // @ts-ignore
    .replaceAllObjects(transformed, {safe: true})
}

dotenv.config()
logger.setLevel('info')

Promise.all([syncPosts(), syncCollections()])
  .then(([posts, collections]) => {
    logger.info(
      `🎉 Sucessfully added ${posts.objectIDs.length} posts to Algolia search.`
    )

    logger.info(
      `🎉 Sucessfully added ${collections.objectIDs.length} collections to Algolia search.`
    )
  })
  .catch((error) => {
    Sentry.captureException(error)
  })
