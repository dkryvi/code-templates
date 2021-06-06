import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

import Author from 'types/author'

type Props = {
  title: string
  coverImage: string
  tags: Array<string>
  date: string
  excerpt: string
  author: Author
  slug: string
}

const HeroPost = ({
  title,
  coverImage,
  tags,
  date,
  excerpt,
  author,
  slug
}: Props) => {
  return (
    <section className="mb-20 md:mb-28">
      <CoverImage title={title} src={coverImage} slug={slug} />
      <h3 className="mt-8 text-4xl lg:text-6xl leading-tight">
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
      <div className="mt-4 md:mb-0 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <div>
        <p className="text-lg leading-relaxed mt-4">{excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </section>
  )
}

export default HeroPost
