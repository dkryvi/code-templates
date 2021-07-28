import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'

import Post from 'types/post'

import intersection from '../utils/intersection'

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

type GetPostsParams = {
  limit?: number
  offset?: number
  fields?: Array<string>
  tags?: Array<string>
  excludedSlugs?: Array<string>
}

export function getPosts(params: GetPostsParams = {}): Array<Post> {
  const {
    limit = Infinity,
    offset = 0,
    fields = [
      'title',
      'date',
      'slug',
      'author',
      'tags',
      'coverImage',
      'excerpt'
    ],
    tags = [],
    excludedSlugs = []
  } = params

  const slugs = getPostSlugs()
  const posts = slugs
    .filter((slug) => !excludedSlugs.includes(slug.split('.')[0]))
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  if (tags.length > 0) {
    return posts
      .filter((post) => intersection(post.tags, tags).length > 0)
      .slice(offset, limit)
  }

  return posts.slice(offset, limit)
}
