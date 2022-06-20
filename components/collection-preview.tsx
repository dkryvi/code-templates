import type {Tag} from '@prisma/client'
import Image from 'next/image'

import {toTitleCase} from 'utils/string'

import TagList from './tag-list'

type Props = {
  title: string
  excerpt?: string | null
  image: string
  tags: Array<Tag>
}

const CollectionPreview: React.FC<Props> = ({title, excerpt, image, tags}) => {
  const tagList = tags.slice(0, 8).map((tag) => tag.slug)

  return (
    <article className="h-full rounded border-2 border-black p-4 hover:shadow-xl">
      <div className="mb-4 flex">
        <div className="mr-4 h-12">
          <Image
            src={image}
            className="rounded-full"
            alt={title}
            width={48}
            height={48}
          />
        </div>
        <h3 className="prose text-3xl font-semibold leading-snug">
          {toTitleCase(title)}
        </h3>
      </div>
      <TagList tags={tagList} />
      <p className="prose mt-4 text-lg leading-relaxed line-clamp-3">
        {excerpt}
      </p>
    </article>
  )
}

export default CollectionPreview
