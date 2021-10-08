import {Post, Prisma} from '@prisma/client'

import {prisma} from './client'

export async function getPost(
  args: Prisma.PostFindUniqueArgs
): Promise<Post | null> {
  return await prisma.post.findUnique(args)
}

export async function getPosts(
  args?: Prisma.PostFindManyArgs
): Promise<Array<Post>> {
  return await prisma.post.findMany(args)
}
