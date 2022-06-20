import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import Link from 'next/link'

import {getCollections} from 'api/collection'
import CollectionPreview from 'components/collection-preview'
import Container from 'components/container'
import Layout from 'components/layout'
import Title from 'components/title'
import type {CollectionsWithTags} from 'domain/types'

type Props = {
  collections: CollectionsWithTags
}

const CollectionsPage: React.FC<Props> = ({collections}) => {
  return (
    <Layout>
      <NextSeo title="Collections | Code Templates" />
      <Container>
        <Title>Collections</Title>
        <ul className="mb-4 grid grid-cols-1 gap-10 md:grid-cols-2">
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link href={`/collections/${collection.title}`}>
                <a aria-label={collection.title}>
                  <CollectionPreview
                    title={collection.title}
                    excerpt={collection.excerpt}
                    image={collection.imageUrl}
                    tags={collection.tags}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export default CollectionsPage

export const getStaticProps: GetStaticProps = async () => {
  const collections = await getCollections({
    orderBy: {
      tags: {
        _count: 'desc'
      }
    }
  })

  return {
    props: {collections}
  }
}
