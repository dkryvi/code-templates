import fs from 'fs'
import {join} from 'path'

import {Author, Post, OgImage} from '@prisma/client'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

type LocalPost = Pick<
  Post,
  'slug' | 'title' | 'date' | 'tags' | 'coverImage' | 'excerpt' | 'content'
> & {
  author: Omit<Author, 'id'>
  ogImage: Omit<OgImage, 'id'>
}

export function getLocalPostBySlug(slug: string): LocalPost {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {data, content} = matter(fileContents)

  return {
    ...(data as Omit<LocalPost, 'content'>),
    content
  }
}

export function getLocalPosts(): Array<LocalPost> {
  const slugs = fs.readdirSync(postsDirectory)

  const posts = slugs
    .map((slug) => getLocalPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}
