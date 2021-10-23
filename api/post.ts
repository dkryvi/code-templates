import {Post, Prisma} from '@prisma/client'

import prisma from '../lib/prisma'

export async function getPost(
  args: Prisma.PostFindUniqueArgs
): Promise<Post | null> {
  const data = await prisma.post.findUnique(args)
  return JSON.parse(JSON.stringify(data))
}

export async function getPosts(
  args?: Prisma.PostFindManyArgs
): Promise<Array<Post>> {
  const data = await prisma.post.findMany(args)
  return JSON.parse(JSON.stringify(data))
}
