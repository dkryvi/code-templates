import React from 'react'

type Props = {
  tags: Array<string>
}

const Tags: React.FC<Props> = ({tags}) => {
  return (
    <ul className="flex flex-wrap -mx-2 -my-1">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="mx-2 my-1 px-2 py-0.5 bg-black text-white rounded"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default Tags
