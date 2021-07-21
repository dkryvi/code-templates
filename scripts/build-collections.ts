import {getPosts} from '../lib/api'
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

export async function buildCollections(): Promise<void> {
  const posts = getPosts()

  const groupedPosts = groupPostsByPrimaryTag(posts)

  const collections = Object.keys(groupedPosts).map((title) => ({
    title,
    excerpt: 'Collection excerpt', // TODO: add mapping for collection excerpt by title
    coverImage: null, // TODO: add mapping for collection image by title
    tags: getUniquePostsTags(groupedPosts[title]),
    slugs: groupedPosts[title].map((post) => post.slug)
  }))

  await serializeToFile(
    `${process.cwd()}/.content/collections.json`,
    collections,
    {
      flag: 'w+'
    }
  )
}
