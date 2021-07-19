import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'

import Post from 'types/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs(): Array<string> {
  return fs.readdirSync(postsDirectory)
}

type SlugPost = Post & {
  [key: string]: string
}

export function getPostBySlug(slug: string, fields: string[] = []): SlugPost {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)

  const items = {} as SlugPost

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

const DEFAULT_FIELDS = [
  'title',
  'date',
  'slug',
  'author',
  'tags',
  'coverImage',
  'excerpt'
]

export function getAllPosts(fields: string[] = DEFAULT_FIELDS): Array<Post> {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}
