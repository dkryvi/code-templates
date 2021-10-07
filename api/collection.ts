import {
  CollectionFindManyArgs,
  CollectionFindUniqueArgs,
  Collection
} from '@prisma/client'

import {prisma} from './client'

export async function getCollections(
  args?: CollectionFindManyArgs
): Promise<Array<Collection>> {
  return await prisma.collection.findMany(args)
}

export async function getCollection(
  args?: CollectionFindUniqueArgs
): Promise<Collection | null> {
  return await prisma.collection.findUnique(args)
}
