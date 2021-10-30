import logger from 'loglevel'

import prisma from '../lib/prisma'
import {LocalPost} from '../types'
import {getLocalPosts} from '../utils/local'

async function syncPost(post: LocalPost) {
  const dbAuthor = await prisma.author.upsert({
    where: {email: post.author.email},
    create: {
      name: post.author.name,
      email: post.author.email,
      picture: post.author.picture
    },
    update: {}
  })
  const dbOgImage = await prisma.ogImage.upsert({
    where: {url: post.ogImage.url},
    create: {url: post.ogImage.url},
    update: {}
  })

  const postData = {
    author: {
      connect: {
        id: dbAuthor.id
      }
    },
    content: post.content,
    coverImage: post.coverImage,
    excerpt: post.excerpt,
    slug: post.slug,
    tags: post.tags,
    title: post.title,
    ogImage: {
      connect: {
        id: dbOgImage.id
      }
    }
  }

  await prisma.post.upsert({
    where: {slug: post.slug},
    create: postData,
    update: postData
  })
}

async function syncPosts() {
  await prisma.$connect()

  const posts = getLocalPosts()

  await posts.reduce(async (memo, post) => {
    await memo
    await syncPost(post)
  }, Promise.resolve())

  return posts
}

try {
  logger.setLevel('info')
  syncPosts().then((posts) => {
    logger.info(`🎉 Successfully synced ${posts.length} posts`)
  })
} catch (error) {
  console.log({error})
  // TODO: use some tool to track errors
  throw error
} finally {
  prisma.$disconnect()
}
