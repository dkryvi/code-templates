import logger from 'loglevel'

import {prisma, getPosts} from '../api'
import {Post} from '../types'

function getPostData(post: Post, action: 'update' | 'create') {
  return {
    author: {
      [action]: {
        name: post.author.name,
        picture: post.author.picture
      }
    },
    content: post.content,
    coverImage: post.coverImage,
    date: post.date,
    excerpt: post.excerpt,
    slug: post.slug,
    tags: post.tags,
    title: post.title,
    ogImage: {
      [action]: {
        url: post.ogImage.url
      }
    }
  }
}

async function main() {
  await prisma.$connect()

  const posts = getPosts()

  const promises = posts.map(async function (post) {
    return await prisma.post.upsert({
      where: {slug: post.slug},
      create: getPostData(post, 'create'),
      update: getPostData(post, 'update')
    })
  })

  const newPosts = await Promise.all(promises)

  logger.info(`🎉 Successfully synced ${newPosts.length} posts`)
}

logger.setLevel('info')

try {
  main()
} catch (error) {
  console.log('error')
  throw error
} finally {
  prisma.$disconnect()
}
