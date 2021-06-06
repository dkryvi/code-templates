import Link from 'next/link'

import Author from 'types/author'

import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  tags: Array<string>
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  tags,
  slug
}: Props) => {
  return (
    <article>
      <CoverImage title={title} src={coverImage} slug={slug} />
      <h3 className="mt-8 md:mt-16 text-3xl leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <ul className="mt-4 flex space-x-2">
        {tags.map((tag, index) => (
          <li key={index} className="px-2 py-0.5 bg-black text-white rounded">
            {tag}
          </li>
        ))}
      </ul>
      <div className="text-lg mt-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mt-4">{excerpt}</p>
      <div className="mt-4">
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </article>
  )
}

export default PostPreview
