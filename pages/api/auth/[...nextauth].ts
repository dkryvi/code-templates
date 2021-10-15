import {NextApiHandler} from 'next'
import NextAuth from 'next-auth'
// import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

// import prisma from '../../../lib/prisma'

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  database: process.env.DATABASE_URL,
  // adapter: Adapters.Prisma.Adapter({prisma}),
  secret: process.env.SECRET,
  session: {
    jwt: true
  }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
