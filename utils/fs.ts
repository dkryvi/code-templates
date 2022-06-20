import fs from 'fs'
import {join} from 'path'

import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {data, content} = matter(fileContents)

  return {
    ...data,
    author: data.author,
    date: data.date ?? new Date().getTime(),
    content,
    coverImage: data.coverImage,
    slug: realSlug,
    ogImage: data.ogImage?.url
  }
}

interface GetPostsOptions {
  limit?: number
  excludedSlugs?: Array<string>
}

export function getPosts(options?: GetPostsOptions) {
  const {limit = Infinity, excludedSlugs = []} = options ?? {}
  const slugs = fs.readdirSync(postsDirectory)

  const posts = slugs
    .filter((slug) => !excludedSlugs.includes(slug))
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(0, limit)

  return posts
}
