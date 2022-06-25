import type {BaseItem} from '@algolia/autocomplete-core'
import {Prisma} from '@prisma/client'

import {getCollectionWithTags, getCollectionsWithTags} from 'api/collection'
import {
  getPostsWithAuthor,
  getPostsWithTags,
  getPostsWithAllRelative
} from 'api/post'

export type AlgoliaPost = BaseItem & {
  objectID: string
  slug: string
  tags: Array<string>
  title: string
  image: string
  author_name: string
  author_image: string
  excerpt: string
}

export type AlgoliaCollection = BaseItem & {
  objectID: string
  slug: string
  tags: Array<string>
  title: string
  image: string
  excerpt: string | null
}

export type PostsWithAuthor = Prisma.PromiseReturnType<
  typeof getPostsWithAuthor
>

export type PostsWithTags = Prisma.PromiseReturnType<typeof getPostsWithTags>

export type PostsWithAllRelative = Prisma.PromiseReturnType<
  typeof getPostsWithAllRelative
>

export type CollectionWithTags = Prisma.PromiseReturnType<
  typeof getCollectionWithTags
>

export type CollectionsWithTags = Prisma.PromiseReturnType<
  typeof getCollectionsWithTags
>

interface LegacyAuthor {
  email: string
  image: string
  name: string
}

export interface LegacyPost {
  author: LegacyAuthor
  date: number
  content: string
  coverImage: string
  excerpt: string
  slug: string
  tags: Array<string>
  title: string
}
