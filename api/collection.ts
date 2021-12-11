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

  return deserializeCollectionPage(data.results[0])
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

interface CollectionPayload {
  tags?: Array<string>
  slugs?: Array<string>
}

export async function updateCollection(
  id: string,
  payload: CollectionPayload
): Promise<Collection> {
  const updatedCollection = await notion.pages.update({
    page_id: id,
    properties: {
      tags: (payload.tags ?? []).map((tag) => ({name: tag})),
      slugs: (payload.slugs ?? []).map((slug) => ({name: slug}))
    }
  })

  return deserializeCollectionPage(updatedCollection)
}

export async function createCollection(
  title: string,
  payload: CollectionPayload
) {
  const createdCollection = await notion.pages.create({
    parent: {
      database_id: COLLECTION_DB_ID
    },
    properties: {
      title: [{text: {content: title}}],
      tags: (payload.tags ?? []).map((tag) => ({name: tag})),
      slugs: (payload.slugs ?? []).map((slug) => ({name: slug}))
    }
  })

  return deserializeCollectionPage(createdCollection)
}
