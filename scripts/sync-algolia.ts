// @ts-nocheck
import * as Sentry from '@sentry/nextjs'
import algoliasearch from 'algoliasearch/lite'
import dotenv from 'dotenv'
import logger from 'loglevel'

import {Post as LocalPost} from '../types'
import {getLocalPosts} from '../utils/local'
import '../sentry.server.config'

function transformPostsToSearchObjects(posts: Array<LocalPost>) {
  return posts.map((post, index) => {
    return {
      objectID: `${post.slug}-${index}`,
      slug: post.slug,
      title: post.title,
      tags: post.tags,
      image: post.coverImage,
      author_name: post.author.name,
      author_image: post.author.picture,
      excerpt: post.excerpt,
      date: post.date
    }
  })
}

async function sync() {
  const posts = getLocalPosts()
  const transformed = transformPostsToSearchObjects(posts)

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY as string
  )

  const index = client.initIndex('blog_posts')

  return await index.replaceAllObjects(transformed, {
    safe: true
  })
}

dotenv.config()
logger.setLevel('info')

sync()
  .then((data) =>
    logger.info(
      `🎉 Sucessfully added ${data.objectIDs.length} records to Algolia search.`
    )
  )
  .catch((error) => {
    Sentry.captureException(error)
  })
