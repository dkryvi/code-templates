import clsx from 'clsx'

type Props = {
  tags: Array<string>
  activeTag?: string
  onTagClick: (tag: string) => void
}

const CollectionTagList: React.FC<Props> = ({tags, activeTag, onTagClick}) => {
  const handleClick = (clickedTag: string) => () => {
    onTagClick(clickedTag)
  }

  return (
    <ul className="flex flex-wrap -mx-1 -my-1 mb-8">
      {tags.map((tag) => (
        <li
          key={tag}
          className={clsx([
            'mx-1 my-1 px-4 py-2 transition rounded-full border-2 cursor-pointer',
            activeTag === tag
              ? 'bg-black border-black text-white hover:opacity-70'
              : 'bg-gray-100 border-gray-200 text-black hover:bg-gray-200 hover:border-gray-300'
          ])}
          onClick={handleClick(tag)}
        >
          #{tag}
        </li>
      ))}
    </ul>
  )
}

export default CollectionTagList
