import type {Tag} from '@prisma/client'
import clsx from 'clsx'

type Props = {
  tags: Array<Tag>
  activeTag?: Tag
  onTagClick: (tag: Tag) => void
}

const CollectionTagList: React.FC<Props> = ({tags, activeTag, onTagClick}) => {
  const handleClick = (tag: Tag) => () => {
    onTagClick(tag)
  }

  return (
    <ul className="-mx-1 -my-1 mb-8 flex flex-wrap">
      {tags.map((tag) => (
        <li
          key={tag.id}
          className={clsx([
            'mx-1 my-1 cursor-pointer rounded-full border-2 px-4 py-2 transition',
            activeTag?.id === tag.id
              ? 'border-black bg-black text-white hover:opacity-70'
              : 'border-gray-200 bg-gray-100 text-gray-900 hover:border-gray-300 hover:bg-gray-200'
          ])}
          onClick={handleClick(tag)}
        >
          #{tag.slug}
        </li>
      ))}
    </ul>
  )
}

export default CollectionTagList
