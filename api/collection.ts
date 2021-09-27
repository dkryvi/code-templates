import {Collection} from '@types'

import {getContentData} from '../utils/fs'

import {GetCollectionsParams} from './types'

const bySlugsCount = (col1: Collection, col2: Collection) =>
  col2.slugs.length - col1.slugs.length

export async function getCollections(
  params: GetCollectionsParams = {}
): Promise<Array<Collection>> {
  const {limit = Infinity, offset = 0} = params

  const collections = await getContentData('collections')

  return collections.sort(bySlugsCount).slice(offset, limit)
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | undefined> {
  const collections = await getCollections()

  return collections.find((collection) => collection.title === slug)
}
