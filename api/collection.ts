import type {Collection, Prisma} from '@prisma/client'

import prisma from '../lib/prisma'

export async function getCollection(
  args: Prisma.CollectionFindUniqueArgs
): Promise<Collection | null> {
  const data = await prisma.collection.findUnique(args)
  return JSON.parse(JSON.stringify(data))
}

export async function getCollections(
  args?: Prisma.CollectionFindManyArgs
): Promise<Array<Collection>> {
  const data = await prisma.collection.findMany(args)
  return JSON.parse(JSON.stringify(data))
}

export async function updateCollection(
  args: Prisma.CollectionUpsertArgs
): Promise<Collection> {
  const data = await prisma.collection.upsert(args)

  return JSON.parse(JSON.stringify(data))
}
