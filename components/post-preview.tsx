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
          <div className="p-4">
            <h3 className="text-3xl leading-snug mb-4">{title}</h3>
            <TagList tags={tags} />
            <p className="text-lg leading-relaxed my-4">{slicedExcerpt}</p>
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </article>
      </a>
    </Link>
  )
}

export default PostPreview
