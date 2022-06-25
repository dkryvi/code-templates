import {Collection} from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title?: string
  collections: Collection[]
}

const CollectionList: React.FC<Props> = ({title, collections}) => (
  <section className="mb-16">
    {title && (
      <h2 className="prose mb-8 text-6xl font-bold leading-tight tracking-tighter">
        {title}
      </h2>
    )}
    <ul className="mb-4 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/collections/${collection.slug}`}>
          <a aria-label={collection.title}>
            <li className="grid grid-cols-12 place-items-center rounded border-2 border-black p-2 hover:shadow-xl">
              <div className="relative col-span-3 h-16 w-16">
                <Image
                  className="rounded"
                  src={collection.imageUrl}
                  alt={collection.title}
                  layout="fill"
                />
              </div>
              <h3 className="prose col-span-9 text-center text-3xl font-semibold">
                {collection.title}
              </h3>
            </li>
          </a>
        </Link>
      ))}
    </ul>
    <Link href="/collections">
      <a
        className="mt-4 block text-right text-lg font-bold text-gray-900 hover:underline"
        aria-label="View All"
      >
        View All
      </a>
    </Link>
  </section>
)

export default CollectionList
