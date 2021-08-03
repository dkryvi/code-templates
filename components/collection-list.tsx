import Image from 'next/image'
import Link from 'next/link'

import {COLLECTION_IMAGE_FALLBACK} from 'lib/constants'
import Collection from 'types/collection'

type Props = {
  title?: string
  collections: Collection[]
}

function toTitleCase(title: string): string {
  return title.charAt(0).toUpperCase() + title.substr(1).toLowerCase()
}

const CollectionList: React.FC<Props> = ({title, collections}) => {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-4">
        {collections.map((collection) => (
          <li
            key={collection.title}
            className="rounded border-black border-2 p-2 transform hover:shadow-xl"
          >
            <Link href={`/collections/${collection.title}?p=1`}>
              <a
                className="grid grid-cols-12 place-items-center "
                aria-label={collection.title}
              >
                <div className="col-span-3 relative h-16 w-16">
                  <Image
                    className="rounded"
                    src={collection.coverImage ?? COLLECTION_IMAGE_FALLBACK}
                    alt={collection.title}
                    layout="fill"
                  />
                </div>
                <p className="col-span-9 text-center text-xl font-semibold">
                  {toTitleCase(collection.title)}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/collections">
        <a
          className="block text-right text-lg font-bold hover:underline"
          aria-label="View All"
        >
          View All
        </a>
      </Link>
    </section>
  )
}

export default CollectionList
