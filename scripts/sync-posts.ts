import logger from 'loglevel'

import {prisma, getLocalPosts} from '../api'
import {LocalPost} from '../types'

async function syncPost(post: LocalPost) {
  const dbAuthor = await prisma.author.upsert({
    where: {name: post.author.name},
    create: {name: post.author.name, picture: post.author.picture},
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
    date: post.date,
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
