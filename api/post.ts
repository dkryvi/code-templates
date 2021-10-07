import {PostFindUniqueArgs, PostFindManyArgs, Post} from '@prisma/client'

import {prisma} from './client'

export async function getPost(args?: PostFindUniqueArgs): Promise<Post | null> {
  return await prisma.post.findUnique(args)
}

export async function getPosts(args?: PostFindManyArgs): Promise<Array<Post>> {
  return await prisma.post.findMany(args)
}
