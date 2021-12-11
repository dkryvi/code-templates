import type {BaseItem} from '@algolia/autocomplete-core'

export interface Author {
  email: string
  image: string
  name: string
}

export interface DictionaryNote {
  excerpt: string
  image: string | null
  title: string
}

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

export interface Post {
  author: Author
  date: number
  content: string
  coverImage: string
  excerpt: string
  ogImage: string
  slug: string
  tags: Array<string>
  title: string
}

export interface Collection {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  excerpt: string | null
  image: string
  tags: string[]
  slugs: string[]
}

export interface CollectionDictionary {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  excerpt: string
  image: string
}
