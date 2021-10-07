import {Author, Post, OgImage} from '@prisma/client'

export type LocalPost = Pick<
  Post,
  'slug' | 'title' | 'date' | 'tags' | 'coverImage' | 'excerpt' | 'content'
> & {
  author: Omit<Author, 'id'>
  ogImage: Omit<OgImage, 'id'>
}
