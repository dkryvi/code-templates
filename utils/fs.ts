import fs from 'fs'
import {join} from 'path'

import matter from 'gray-matter'

import {LegacyPost} from '../domain/types'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostBySlug(slug: string): LegacyPost {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {data, content} = matter(fileContents)

  return {
    ...(data as Omit<LegacyPost, 'author' | 'content' | 'coverImage'>),
    author: data.author,
    date: data.date ?? new Date().getTime(),
    content,
    coverImage: data.coverImage,
    slug: realSlug
  }
}

interface GetPostsOptions {
  limit?: number
  excludedSlugs?: Array<string>
}

export function getPosts(options?: GetPostsOptions): Array<LegacyPost> {
  const {limit = Infinity, excludedSlugs = []} = options ?? {}
  const slugs = fs.readdirSync(postsDirectory)

  const posts = slugs
    .filter((slug) => !excludedSlugs.includes(slug))
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(0, limit)

  return posts
}
