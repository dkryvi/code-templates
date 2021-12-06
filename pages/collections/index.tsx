import {Collection} from '@prisma/client'
import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import Link from 'next/link'

import {getCollections} from 'api/collection'
import CollectionPreview from 'components/collection-preview'
import Container from 'components/container'
import Layout from 'components/layout'
import Title from 'components/title'

type Props = {
  collections: Collection[]
}

const CollectionsPage: React.FC<Props> = ({collections}) => {
  return (
    <Layout>
      <NextSeo title="Collections | Code Templates" />
      <Container>
        <Title>Collections</Title>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
          {collections.map((collection, index) => (
            <li key={index}>
              <Link href={`/collections/${collection.title}`}>
                <a aria-label={collection.title}>
                  <CollectionPreview
                    title={collection.title}
                    excerpt={collection.excerpt}
                    image={collection.image}
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
    sorts: [{property: 'slugs', direction: 'descending'}]
  })

  return {
    props: {collections}
  }
}
