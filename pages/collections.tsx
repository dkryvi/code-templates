import {GetStaticProps} from 'next'

import {getCollections} from 'lib/api'
import Collection from 'types/collection'

import Container from 'components/container'
import Layout from 'components/layout'

type Props = {
  collections: Collection[]
}

const Index: React.FC<Props> = ({collections}) => {
  return (
    <Layout>
      <Container>
        <ul>
          {collections.map((collection, index) => (
            <li key={index}>{collection.title}</li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const collections = await getCollections()

  return {
    props: {collections}
  }
}
