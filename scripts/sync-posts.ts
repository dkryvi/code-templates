import logger from 'loglevel'

import {prisma, getPosts} from '../api'

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
        data: post
      })
    } else {
      await prisma.post.create({
        data: post
      })
    }
  }

  logger.info(`🎉 Successfully synced ${posts.length} collections`)
}

build()
