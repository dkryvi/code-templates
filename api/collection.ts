import {Collection, Prisma} from '@prisma/client'

import prisma from 'lib/prisma'

export async function getCollectionWithTags(
  args: Prisma.CollectionFindUniqueArgs
) {
  return prisma.collection.findUnique({...args, include: {tags: true}})
}

export async function getCollections(
  args?: Prisma.CollectionFindManyArgs
): Promise<Collection[]> {
  return prisma.collection.findMany(args)
}

export async function getCollectionsWithTags(
  args?: Prisma.CollectionFindManyArgs
) {
  return prisma.collection.findMany({...args, include: {tags: true}})
}

export async function getCollectionsWithPosts(
  args?: Prisma.CollectionFindManyArgs
) {
  return prisma.collection.findMany({...args, include: {posts: true}})
}

export async function getCollectionsWithAllRelative(
  args?: Prisma.CollectionFindManyArgs
) {
  return prisma.collection.findMany({
    ...args,
    include: {posts: true, tags: true}
  })
}
