import logger from 'loglevel'

import {prisma, getPosts} from '../api'

async function syncPosts() {
  await prisma.$connect()

  const posts = getPosts()

  return await Promise.all(
    posts.map(async function (post) {
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

      return await prisma.post.upsert({
        where: {slug: post.slug},
        create: postData,
        update: postData
      })
    })
  )
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
