// import fs from 'fs'
// import {join} from 'path'
// import matter from 'gray-matter'

import Collection from 'types/collection'

import {getContentData} from '../utils'

// type SlugPost = Post & {
//   [key: string]: string
// }

type GetCollectionParams = {
  limit?: number
  offset?: number
  fields?: Array<string>
  tags?: Array<string>
  excludedSlugs?: Array<string>
}

// export function getPostSlugs(): Array<string> {
//   return fs.readdirSync(postsDirectory)
// }

// export function getPostBySlug(slug: string, fields: string[] = []): SlugPost {
//   const realSlug = slug.replace(/\.md$/, '')
//   const fullPath = join(postsDirectory, `${realSlug}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')
//   const {data, content} = matter(fileContents)

//   const items = {} as SlugPost

//   // Ensure only the minimal needed data is exposed
//   fields.forEach((field) => {
//     if (field === 'slug') {
//       items[field] = realSlug
//     }
//     if (field === 'content') {
//       items[field] = content
//     }

//     if (data[field]) {
//       items[field] = data[field]
//     }
//   })

//   return items
// }

const bySlugsCount = (col1: Collection, col2: Collection) =>
  col2.slugs.length - col1.slugs.length

export async function getCollections(
  params: GetCollectionParams = {}
): Promise<Array<Collection>> {
  const {limit = Infinity, offset = 0} = params

  const collections = await getContentData('collections')

  return collections.sort(bySlugsCount).slice(offset, limit)
}
