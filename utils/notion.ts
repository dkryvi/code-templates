// @ts-nocheck
import {GetPageResponse} from '@notionhq/client/build/src/api-endpoints'

import {Collection} from '../types'

export function deserializeCollectionPage(page: GetPageResponse): Collection {
  return {
    id: page.id,
    updatedAt: page.properties?.updatedAt?.last_edited_time,
    createdAt: page.properties?.createdAt?.created_time,
    title: page.properties?.title?.title?.[0]?.plain_text,
    excerpt: page.properties?.excerpt?.rich_text[0]?.plain_text,
    image: page.properties?.image?.files?.[0]?.external?.url,
    tags: page.properties?.tags?.multi_select?.map((tag) => tag.name),
    slugs: page.properties?.slugs?.multi_select?.map((slug) => slug.name)
  }
}
