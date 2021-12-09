import type {QueryDatabaseParameters} from '@notionhq/client/build/src/api-endpoints'

import type {Collection} from 'types'

import notion from '../lib/notion'
import {deserializeCollectionPage} from '../utils/notion'

const COLLECTION_DB_ID = process.env
  .NEXT_PUBLIC_COLLECTION_DATABASE_ID as string

export async function getCollection(slug: string): Promise<Collection | null> {
  const data = await notion.databases.query({
    database_id: COLLECTION_DB_ID,
    filter: {
      property: 'title',
      text: {
        equals: slug
      }
    }
  })

  if (data.results?.length === 0) {
    return null
  }

  const collection = deserializeCollectionPage(data.results[0])

  return collection
}

export async function getCollections(
  params?: Omit<QueryDatabaseParameters, 'database_id'>
): Promise<Array<Collection>> {
  const data = await notion.databases.query({
    database_id: COLLECTION_DB_ID,
    ...params
  })

  return data.results.map(deserializeCollectionPage)
}

interface UpdateCollectionPayload {
  tags?: Array<string>
  slug?: Array<string>
}

export async function updateCollection(
  id: string,
  payload: UpdateCollectionPayload
): Promise<Collection> {
  return Promise.resolve({
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'title',
    excerpt: 'excerpt',
    image: '',
    tags: [],
    slugs: []
  })
}
