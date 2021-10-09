import fs from 'fs'
import {join} from 'path'

import matter from 'gray-matter'

import {LocalPost} from '../types'

const postsDirectory = join(process.cwd(), '_posts')

export function getLocalPostBySlug(slug: string): LocalPost {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {data, content} = matter(fileContents)

  return {
    ...(data as Omit<LocalPost, 'content'>),
    content,
    slug: realSlug
  }
}

export function getLocalPosts(): Array<LocalPost> {
  const slugs = fs.readdirSync(postsDirectory)

  const posts = slugs
    .map((slug) => getLocalPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}
