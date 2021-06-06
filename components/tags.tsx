import React from 'react'
import Link from 'next/link'

type Props = {
  tags: Array<string>
}

function Tags({tags}: Props) {
  return (
    <ul className="flex space-x-2">
      {tags.map((tag, index) => (
        <li key={index} className="px-2 py-0.5 bg-black text-white rounded">
          <Link href={`/?tag=${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Tags
