import Collection from 'types/collection'

import {getContentData} from '../utils/fs'

const bySlugsCount = (col1: Collection, col2: Collection) =>
  col2.slugs.length - col1.slugs.length

type GetCollectionsParams = {
  limit?: number
  offset?: number
  fields?: Array<string>
  tags?: Array<string>
  excludedSlugs?: Array<string>
}

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
