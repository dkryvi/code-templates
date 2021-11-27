import {CollectionDictionary} from '@prisma/client'

import prisma from '../lib/prisma'

export function getCollectionDictionaries(): Promise<
  Array<CollectionDictionary>
> {
  return prisma.collectionDictionary.findMany()
}
