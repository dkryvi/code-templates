import {Author} from 'types'

import Avatar from './avatar'
import TagList from './tag-list'

type Props = {
  title: string
  excerpt: string
  author: Author
  tags: Array<string>
}

const PostPreview: React.FC<Props> = ({title, excerpt, author, tags}) => {
  const slicedExcerpt =
    excerpt.length > 100 ? `${excerpt.slice(0, 100)}...` : excerpt

  return (
    <article className="h-full rounded border-2 border-black hover:shadow-xl">
      <div className="p-4">
        <Avatar name={author.name} picture={author.image} />
        <h3 className="prose my-4 text-3xl font-semibold leading-snug">
          {title}
        </h3>
        <TagList tags={tags} />
        <p className="prose mt-4 text-lg leading-relaxed">{slicedExcerpt}</p>
      </div>
    </article>
  )
}

export default PostPreview
