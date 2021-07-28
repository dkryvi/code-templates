import clsx from 'clsx'

type Props = {
  tags: Array<string>
  activeTag?: string
  onTagClick: (tag: string) => void
}

const CollectionTags: React.FC<Props> = ({tags, activeTag, onTagClick}) => {
  const handleClick = (clickedTag: string) => () => {
    onTagClick(clickedTag)
  }

  return (
    <ul className="flex flex-wrap -mx-1 -my-1 mb-8">
      {tags.map((tag) => (
        <li
          key={tag}
          className={clsx([
            'mx-1 my-1 px-4 py-2 transition bg-black text-white rounded-full cursor-pointer hover:opacity-80',
            activeTag === tag && 'bg-green-500'
          ])}
          onClick={handleClick(tag)}
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default CollectionTags
