import {withSentry} from '@sentry/nextjs'
import type {NextApiRequest, NextApiResponse} from 'next'

import prisma from 'lib/prisma'
import supabase from 'lib/supabase'
import {getErrorMessage} from 'utils/error'
import {toSlugCase} from 'utils/string'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed'})
  }

  const token = req.headers.token as string
  const {data: user, error} = await supabase.auth.api.getUser(token)

  if (error) res.status(401).json({error: getErrorMessage(error)})

  try {
    const {title, tags, coverImage, socialImage, excerpt, content} = JSON.parse(
      req.body
    )
    const result = await prisma.post.create({
      data: {
        slug: toSlugCase(title),
        title,
        // TODO: create multiselect for tags
        tags: tags.split(', '),
        coverImage,
        // connect or create a new author(if it's a first author post)
        author: {connect: {email: user?.email}},
        // connect or create a new ogImage
        ogImage: {connect: {url: socialImage}},
        excerpt,
        content
      }
    })
    res.json(result)
  } catch (error) {
    res.status(500).json({error: getErrorMessage(error)})
  }
}

export default withSentry(handler)
