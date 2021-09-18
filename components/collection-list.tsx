import Image from 'next/image'
import Link from 'next/link'

import {COLLECTION_IMAGE_FALLBACK} from '@constants'
import {Collection} from '@types'

import {toTitleCase} from '@utils/string'

type Props = {
  title?: string
  collections: Collection[]
}

const CollectionList: React.FC<Props> = ({title, collections}) => {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="prose mb-8 text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mb-4">
        {collections.map((collection) => (
          <li
            key={collection.id}
            className="grid grid-cols-12 place-items-center rounded border-black border-2 p-2"
          >
            <div className="col-span-3 relative h-16 w-16">
              <Image
                className="rounded"
                src={collection.coverImage ?? COLLECTION_IMAGE_FALLBACK}
                alt={collection.title}
                layout="fill"
              />
            </div>
            <h3 className="prose col-span-9 text-center text-3xl font-semibold">
              <Link href={`/collections/${collection.title}?p=1`}>
                <a aria-label={collection.title}>
                  {toTitleCase(collection.title)}
                </a>
              </Link>
            </h3>
          </li>
        ))}
      </ul>
      <Link href="/collections">
        <a
          className="block mt-4 text-right text-lg text-gray-900 font-bold"
          aria-label="View All"
        >
          View All
        </a>
      </Link>
    </section>
  )
}

export default CollectionList
