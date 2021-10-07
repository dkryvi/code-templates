import {Author} from '@prisma/client'
import Link from 'next/link'

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
    <article className="h-full rounded border-black border-2 hover:shadow-xl">
      <div className="p-4">
        <Avatar name={author.name} picture={author.picture} />
        <h3 className="prose text-3xl leading-snug my-4 font-semibold">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{title}</a>
          </Link>
        </h3>
        <TagList tags={tags} />
        <p className="prose text-lg leading-relaxed mt-4">{slicedExcerpt}</p>
      </div>
    </article>
  )
}

export default PostPreview
