import Image from 'next/image'
import Link from 'next/link'

import {toTitleCase} from '@utils/string'

import TagList from './tag-list'

type Props = {
  title: string
  excerpt?: string | null
  coverImage?: string | null
  tags: Array<string>
}

const CollectionPreview: React.FC<Props> = ({
  title,
  excerpt,
  coverImage,
  tags
}) => {
  return (
    <article className="h-full rounded border-black border-2 p-4 hover:shadow-xl">
      <div className="flex mb-4">
        {coverImage && (
          <div className="h-12 mr-4">
            <Image
              src={coverImage}
              className="rounded-full"
              alt={title}
              width={48}
              height={48}
            />
          </div>
        )}
        <h3 className="prose text-3xl leading-snug font-semibold">
          <Link as={`/collections/${title}?p=1`} href="/collections/[slug]">
            <a aria-label={title}>{toTitleCase(title)}</a>
          </Link>
        </h3>
      </div>
      <TagList tags={tags.slice(0, 8)} />
      <p className="prose text-lg leading-relaxed mt-4 line-clamp-3">
        {excerpt}
      </p>
    </article>
  )
}

export default CollectionPreview
