import {Collection} from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import {toTitleCase} from 'utils/string'

type Props = {
  title?: string
  collections: Collection[]
}

const CollectionList: React.FC<Props> = ({title, collections}) => (
  <section className="mb-16">
    {title && (
      <h2 className="prose mb-8 text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
    )}
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mb-4">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/collections/${collection.title}`}>
          <a aria-label={collection.title}>
            <li className="grid grid-cols-12 place-items-center rounded border-black border-2 p-2 hover:shadow-xl">
              <div className="col-span-3 relative h-16 w-16">
                <Image
                  className="rounded"
                  src={collection.image}
                  alt={collection.title}
                  layout="fill"
                />
              </div>
              <h3 className="prose col-span-9 text-center text-3xl font-semibold">
                {toTitleCase(collection.title)}
              </h3>
            </li>
          </a>
        </Link>
      ))}
    </ul>
    <Link href="/collections">
      <a
        className="block mt-4 text-right text-lg text-gray-900 font-bold hover:underline"
        aria-label="View All"
      >
        View All
      </a>
    </Link>
  </section>
)

export default CollectionList
