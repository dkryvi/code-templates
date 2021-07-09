import Link from 'next/link'

import Author from 'types/author'

import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Tags from './tags'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  tags: Array<string>
  slug: string
}

const PostPreview: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  tags,
  slug
}) => {
  const slicedExcerpt =
    excerpt.length > 250 ? `${excerpt.slice(0, 250)}...` : excerpt

  return (
    <article className="rounded transition ease-in-out transform hover:scale-105 hover:shadow-xl">
      <CoverImage title={title} src={coverImage} slug={slug} />
      <div className="px-4 py-8">
        <h3 className="md:mt-4 text-3xl leading-snug">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className="mt-4">
          <Tags tags={tags} />
        </div>
        <div className="text-lg mt-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mt-4">{slicedExcerpt}</p>
        <div className="mt-4">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </article>
  )
}

export default PostPreview
