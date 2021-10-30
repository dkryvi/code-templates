import {Post} from '@prisma/client'
import type {NextApiRequest, NextApiResponse} from 'next'

import prisma from 'lib/prisma'
import supabase from 'lib/supabase'
import {getErrorMessage} from 'utils/error'
import {toSlugCase} from 'utils/string'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Post | undefined | void> {
  const token = req.headers.token as string
  const {data: user, error} = await supabase.auth.api.getUser(token)

  if (error) return res.status(401).json({error: getErrorMessage(error)})

  const {title, tags, coverImage, socialImage, excerpt, content} = req.body
  const result = await prisma.post.create({
    data: {
      slug: toSlugCase(title),
      title,
      // TODO: create multiselect for tags
      tags: tags.split(', '),
      coverImage,
      // connect or create a new author(if it's a first author post)
      author: {connect: {email: user?.email}},
      ogImage: {connect: {url: socialImage}},
      excerpt,
      content
    }
  })

  res.json(result)
}
