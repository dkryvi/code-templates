import {Post} from 'types'

export function getUniquePostsTags(posts: Array<Post>): Array<string> {
  const allTags = posts
    .reduce((res: Array<string>, post: Post) => [...res, ...post.tags], [])
    .filter(Boolean)

  return [...Array.from(new Set(allTags))]
}
