import * as Sentry from '@sentry/nextjs'
import logger from 'loglevel'

import prisma from '../lib/prisma'
import {LocalPost} from '../types'
import {getLocalPosts} from '../utils/local'
import '../sentry.server.config'

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

async function sync() {
  await prisma.$connect()

  const posts = getLocalPosts()

  await posts.reduce(async (memo, post) => {
    await memo
    await syncPost(post)
  }, Promise.resolve())

  return posts
}

logger.setLevel('info')

sync()
  .then((posts) => logger.info(`🎉 Successfully synced ${posts.length} posts`))
  .catch((error) => Sentry.captureException(error))
  .finally(() => prisma.$disconnect())
