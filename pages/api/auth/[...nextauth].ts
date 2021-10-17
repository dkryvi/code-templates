import {NextApiHandler} from 'next'
import NextAuth from 'next-auth'
// import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

// import prisma from '../../../lib/prisma'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    })
  ],
  // database: process.env.DATABASE_URL,
  // adapter: Adapters.Prisma.Adapter({prisma}),
  secret: process.env.SECRET,
  session: {
    jwt: true
  }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
