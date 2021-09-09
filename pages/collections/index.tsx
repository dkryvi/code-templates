import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'

import {Collection} from '@types'

import CollectionPreview from '@components/collection-preview'
import Container from '@components/container'
import Layout from '@components/layout'
import {getCollections} from '@lib/api'

type Props = {
  collections: Collection[]
}

const CollectionsPage: React.FC<Props> = ({collections}) => {
  return (
    <Layout>
      <NextSeo title="Collections | Code Templates" />
      <Container>
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          Collections
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
          {collections.map((collection, index) => (
            <li key={index}>
              <CollectionPreview
                title={collection.title}
                excerpt={collection.excerpt}
                coverImage={collection.coverImage}
                tags={collection.tags}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export default CollectionsPage

export const getStaticProps: GetStaticProps = async () => {
  const collections = await getCollections()

  return {
    props: {collections}
  }
}
