import {Prisma} from '@prisma/client'

import prisma from '../lib/prisma'
import {getPosts as legacyGetPosts} from '../utils/fs'

const authors: Prisma.UserCreateInput[] = [
  {
    name: 'dkryvi',
    email: 'krivichaninds@gmail.com',
    imageUrl:
      'https://res.cloudinary.com/dkryvi/image/upload/v1654327888/Code%20Templates/authors/1574449729792_gphphs.jpg'
  }
]

const collections: Prisma.CollectionCreateInput[] = [
  {
    slug: 'react',
    title: 'React',
    excerpt: 'React',
    imageUrl:
      'https://res.cloudinary.com/dkryvi/image/upload/v1655545702/Code%20Templates/collections/react_fdxkb1.png'
  },
  {
    slug: 'javascript',
    title: 'Javascript',
    excerpt: 'JS',
    imageUrl:
      'https://res.cloudinary.com/dkryvi/image/upload/v1654327594/Code%20Templates/collections/js_a99acz.png'
  }
]

async function main() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.tag.deleteMany()

  await prisma.user.createMany({data: authors})
  await prisma.collection.createMany({data: collections})

  const author = await prisma.user.findFirst({select: {id: true}})
  const collection = await prisma.collection.findFirst({select: {id: true}})

  const legacyPosts = await legacyGetPosts()

  await prisma.post.createMany({
    data: legacyPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.coverImage,
      authorId: author?.id ?? 1,
      collectionId: collection?.id ?? 1
    }))
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
