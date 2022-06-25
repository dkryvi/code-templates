import {Prisma, Post} from '@prisma/client'

import prisma from '../lib/prisma'

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({where: {slug}})
}

export async function getPosts(
  args?: Prisma.PostFindManyArgs
): Promise<Post[]> {
  return prisma.post.findMany(args)
}

export async function getPostsWithAuthor(args?: Prisma.PostFindManyArgs) {
  return prisma.post.findMany({...args, include: {author: true}})
}

export async function getPostsWithTags(args?: Prisma.PostFindManyArgs) {
  return prisma.post.findMany({...args, include: {tags: true}})
}

export async function getPostsWithAllRelative(args?: Prisma.PostFindManyArgs) {
  return prisma.post.findMany({...args, include: {author: true, tags: true}})
}
