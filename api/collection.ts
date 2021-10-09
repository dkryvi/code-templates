import {Collection, Prisma} from '@prisma/client'

import {prisma} from './client'

export async function getCollection(
  args: Prisma.CollectionFindUniqueArgs
): Promise<Collection | null> {
  return await prisma.collection.findUnique(args)
}

export async function getCollections(
  args?: Prisma.CollectionFindManyArgs
): Promise<Array<Collection>> {
  return await prisma.collection.findMany(args)
}
