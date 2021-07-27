import logger from 'loglevel'

import {COLLECTION_DICTIONARY} from '../lib/constants'
import {serializeToFile} from '../lib/utils'
import Post from '../types/post'

type GroupedPosts = {
  [key: string]: Array<Post>
}

function groupPostsByPrimaryTag(posts: Array<Post>): GroupedPosts {
  return posts.reduce((res: GroupedPosts, post: Post) => {
    const primaryTag = post.tags[0]

    if (res[primaryTag]) {
      return {
        ...res,
        [primaryTag]: [...res[primaryTag], post]
      }
    }

    return {
      ...res,
      [primaryTag]: [post]
    }
  }, {})
}

function getUniquePostsTags(posts: Array<Post>): Array<string> {
  const allTags = posts
    .reduce((res: Array<string>, post: Post) => [...res, post.tags[1]], [])
    .filter(Boolean)

  return [...Array.from(new Set(allTags))]
}

type BuildCollectionsProps = {
  posts: Array<Post>
  outputPath: string
}

export async function buildCollections({
  posts,
  outputPath
}: BuildCollectionsProps): Promise<void> {
  const groupedPosts = groupPostsByPrimaryTag(posts)

  const collections = Object.keys(groupedPosts).map((title) => ({
    title,
    excerpt: COLLECTION_DICTIONARY[title]?.excerpt,
    coverImage: COLLECTION_DICTIONARY[title]?.coverImage,
    tags: getUniquePostsTags(groupedPosts[title]),
    slugs: groupedPosts[title].map((post) => post.slug)
  }))

  await serializeToFile(`${outputPath}/collections.json`, collections, {
    flag: 'w+'
  })

  logger.info(`🎉 Successfully build ${collections.length} collections`)
}
