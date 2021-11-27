import {Post} from 'types'

export interface GroupedPosts {
  [key: string]: Array<Post>
}

export function groupPostsByPrimaryTag(posts: Array<Post>): GroupedPosts {
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

export function getUniquePostsTags(posts: Array<Post>): Array<string> {
  const allTags = posts
    .reduce((res: Array<string>, post: Post) => [...res, post.tags[1]], [])
    .filter(Boolean)

  return [...Array.from(new Set(allTags))]
}
