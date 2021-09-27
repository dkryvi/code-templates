// @ts-nocheck
import algoliasearch from 'algoliasearch/lite'
import dotenv from 'dotenv'
import logger from 'loglevel'

import {getPosts} from '../api'
import {Post} from '../types'

function transformPostsToSearchObjects(posts: Array<Post>) {
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

async function build() {
  dotenv.config()
  logger.setLevel('info')

  const posts = getPosts()
  const transformed = transformPostsToSearchObjects(posts)

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY as string
  )

  const index = client.initIndex('blog_posts')

  const algoliaResponse = await index.replaceAllObjects(transformed, {
    safe: true
  })

  logger.info(
    `🎉 Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search.`
  )
}

build()
