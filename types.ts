import {Author, OgImage, Post, Prisma} from '@prisma/client'

export type LocalPost = Pick<
  Post,
  'slug' | 'title' | 'date' | 'tags' | 'coverImage' | 'excerpt' | 'content'
> & {
  author: Omit<Author, 'id'>
  ogImage: Omit<OgImage, 'id'>
}

const postWithAuthor = Prisma.validator<Prisma.PostArgs>()({
  include: {author: true}
})

export type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>

const extendedPost = Prisma.validator<Prisma.PostArgs>()({
  include: {author: true, ogImage: true}
})

export type ExtendedPost = Prisma.PostGetPayload<typeof extendedPost>
