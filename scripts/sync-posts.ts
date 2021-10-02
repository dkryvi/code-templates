import logger from 'loglevel'

import {prisma, getPosts} from '../api'
import {Post} from '../types'

function getPostData(post: Post, actionKey: 'update' | 'create') {
  return {
    author: {
      [actionKey]: {
        name: post.author.name,
        picture: post.author.picture
      }
    },
    content: post.content,
    coverImage: post.coverImage,
    date: post.date,
    excerpt: post.excerpt,
    ogImage: {
      [actionKey]: {
        url: post.ogImage.url
      }
    },
    slug: post.slug,
    tags: post.tags,
    title: post.title
  }
}

async function build() {
  logger.setLevel('info')
  await prisma.$connect()

  const posts = getPosts()

  const dbPosts = await prisma.post.findMany()

  for (const post of posts) {
    const dbPost = dbPosts.find((dbPost) => dbPost.slug === post.slug)

    if (dbPost) {
      await prisma.post.update({
        where: {id: dbPost.id},
        data: getPostData(post, 'update')
      })
    } else {
      await prisma.post.create({
        data: getPostData(post, 'create')
      })
    }
  }

  logger.info(`🎉 Successfully synced ${posts.length} posts`)
}

build()
