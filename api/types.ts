import {Post} from '@types'

export type GetCollectionsParams = {
  limit?: number
  offset?: number
  fields?: Array<string>
  tags?: Array<string>
  excludedSlugs?: Array<string>
}

export type SlugPost = Post & {
  [key: string]: string
}

export type GetPostsParams = {
  limit?: number
  offset?: number
  fields?: Array<string>
  tags?: Array<string>
  excludedSlugs?: Array<string>
}
