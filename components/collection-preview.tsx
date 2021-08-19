import Link from 'next/link'
import Image from 'next/image'

import TagList from './tag-list'

import toTitleCase from 'lib/utils/to-title-case'

type Props = {
  title: string
  excerpt?: string
  coverImage?: string
  tags: Array<string>
}

const CollectionPreview: React.FC<Props> = ({
  title,
  excerpt,
  coverImage,
  tags
}) => {
  const slicedExcerpt =
    excerpt && excerpt.length > 100 ? `${excerpt.slice(0, 100)}...` : excerpt

  return (
    <article className="h-full rounded border-black border-2 p-4">
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
        <h3 className="text-3xl leading-snug font-semibold">
          <Link as={`/collections/${title}?p=1`} href="/collections/[slug]">
            <a className="hover:underline" aria-label={title}>
              {toTitleCase(title)}
            </a>
          </Link>
        </h3>
      </div>
      <TagList tags={tags.slice(0, 8)} />
      <p className="text-lg leading-relaxed mt-4">{slicedExcerpt}</p>
    </article>
  )
}

export default CollectionPreview
