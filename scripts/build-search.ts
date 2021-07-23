// @ts-nocheck
import dotenv from 'dotenv'
import algoliasearch from 'algoliasearch/lite'

import Post from '../types/post'

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

type BuildSearchProps = {
  posts: Array<Post>
}

export async function buildSearch({posts}: BuildSearchProps): void {
  dotenv.config()

  const transformed = transformPostsToSearchObjects(posts)

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY as string
  )

  const index = client.initIndex('blog_posts')

  const algoliaResponse = await index.saveObjects(transformed)

  console.log(
    `🎉 Sucessfully added ${
      algoliaResponse.objectIDs.length
    } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
      ', '
    )}`
  )
}
