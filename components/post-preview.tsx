import Link from 'next/link'

import Author from 'types/author'

import Avatar from './avatar'
import TagList from './tag-list'

type Props = {
  title: string
  excerpt: string
  author: Author
  tags: Array<string>
  slug: string
}

const PostPreview: React.FC<Props> = ({title, excerpt, author, tags, slug}) => {
  const slicedExcerpt =
    excerpt.length > 100 ? `${excerpt.slice(0, 100)}...` : excerpt

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <a>
        <article className="h-full rounded transition ease-in-out transform hover:scale-105 hover:shadow-xl border-black border-2">
          <div className="px-4 py-8">
            <h3 className="md:mt-4 text-3xl leading-snug">{title}</h3>
            <div className="mt-4">
              <TagList tags={tags} />
            </div>
            <p className="text-lg leading-relaxed mt-4">{slicedExcerpt}</p>
            <div className="mt-4">
              <Avatar name={author.name} picture={author.picture} />
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

export default PostPreview
