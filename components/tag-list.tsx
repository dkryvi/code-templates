import React from 'react'
import Link from 'next/link'

type Props = {
  tags: Array<string>
}

const TagList: React.FC<Props> = ({tags}) => {
  return (
    <ul className="flex flex-wrap -mx-1 -my-1">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="mx-1 my-1 px-2 py-0.5 bg-gray-800 text-white rounded"
        >
          <Link href={`/posts?tag=${tag}`}>
            <a className="hover:underline" aria-label={tag}>
              #{tag}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TagList
