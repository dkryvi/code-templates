import {User} from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import CoverImage from './cover-image'
import Date from './date'

type Props = {
  title: string
  coverImage: string
  date: Date
  excerpt: string
  author: User
  slug: string
}

const PostPreview: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) => {
  return (
    <article className="m-auto h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg ">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <div className="block h-full w-full">
          <CoverImage src={coverImage} title={title} />
          <div className="prose w-full bg-white p-4">
            <p className="mb-2 text-xl font-medium">{title}</p>
            <p className="text-md font-light text-gray-400">
              {excerpt.length > 70 ? `${excerpt.slice(0, 70)}...` : excerpt}
            </p>
            <div className="mt-4 flex items-center">
              <Image
                className="rounded-full object-cover"
                width={40}
                height={40}
                src={author.imageUrl}
                alt="profile"
              />
              <div className="ml-4 flex flex-col justify-between text-sm">
                <span className="text-gray-800">{author.name}</span>
                <Date className="text-gray-400" date={date} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostPreview
