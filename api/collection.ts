import {Collection} from '@types'

import {prisma} from './client'
import {GetCollectionsParams} from './types'

export async function getCollections(
  params?: GetCollectionsParams
): Promise<Array<Collection>> {
  const {limit, offset} = params ?? {}

  const collections = await prisma.collection.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      slugs: 'desc'
    }
  })

  return collections
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  const collection = await prisma.collection.findFirst({
    where: {title: slug}
  })

  return collection
}
