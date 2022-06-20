import {Prisma} from '@prisma/client'

import prisma from '../lib/prisma'

const posts: Prisma.PostCreateInput[] = []
const collections: Prisma.CollectionCreateInput[] = []
const authors: Prisma.UserCreateInput[] = [
  {
    name: 'dkryvi',
    email: 'krivichaninds@gmail.com',
    imageUrl:
      'https://res.cloudinary.com/dkryvi/image/upload/v1654327888/Code%20Templates/authors/1574449729792_gphphs.jpg'
  }
]

async function main() {
  await prisma.user.createMany({data: authors})
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
