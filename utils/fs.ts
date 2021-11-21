import fs from 'fs'
import {join} from 'path'

import matter from 'gray-matter'

import {AUTHOR_FALLBACK, POST_IMAGE_FALLBACK} from '../config'
import {Post} from '../types'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {data, content} = matter(fileContents)

  return {
    ...(data as Omit<Post, 'author' | 'content' | 'coverImage' | 'ogImage'>),
    author: data.author ?? AUTHOR_FALLBACK,
    date: data.date ?? new Date().getTime(),
    content,
    coverImage: data.coverImage ?? POST_IMAGE_FALLBACK,
    slug: realSlug,
    ogImage: data.ogImage?.url ?? POST_IMAGE_FALLBACK
  }
}

interface GetPostsOptions {
  limit?: number
  excludedSlugs?: Array<string>
}

export function getPosts(options?: GetPostsOptions): Array<Post> {
  const {limit = Infinity, excludedSlugs = []} = options ?? {}
  const slugs = fs.readdirSync(postsDirectory)

  const posts = slugs
    .filter((slug) => !excludedSlugs.includes(slug))
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(0, limit)

  return posts
}
