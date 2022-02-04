import Link from 'next/link'
import React from 'react'

type Props = {
  tags: Array<string>
}

const TagList: React.FC<Props> = ({tags}) => {
  return (
    <ul className="-mx-1 -my-1 flex flex-wrap">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="mx-1 my-1 rounded bg-gray-900 px-2 py-0.5 text-white hover:bg-gray-600"
        >
          <Link href={`/posts?tag=${tag}`}>
            <a aria-label={tag}>#{tag}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TagList
