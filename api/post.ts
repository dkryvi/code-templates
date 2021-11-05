import {Post, Prisma} from '@prisma/client'
import merge from 'lodash/merge'

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
  const extendedArgs = merge(args, {where: {isDraft: false}})

  const data = await prisma.post.findMany(extendedArgs)
  return JSON.parse(JSON.stringify(data))
}

export async function getDraftPosts(
  args?: Prisma.PostFindManyArgs
): Promise<Array<Post>> {
  const extendedArgs = merge(args, {where: {isDraft: true}})

  const data = await prisma.post.findMany(extendedArgs)
  return JSON.parse(JSON.stringify(data))
}
