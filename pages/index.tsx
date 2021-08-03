import {GetStaticProps} from 'next'

import {getPosts, getCollections} from 'lib/api'
import Collection from 'types/collection'
import Post from 'types/post'

import Container from 'components/container'
import CollectionList from 'components/collection-list'
import Header from 'components/header'
import PostList from 'components/post-list'
import Layout from 'components/layout'

type Props = {
  collections: Array<Collection>
  posts: Array<Post>
}

const Index: React.FC<Props> = ({collections, posts}) => {
  return (
    <Layout>
      <Container>
        <Header />
        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8">
          Code Templates.
        </h1>
        {collections.length > 0 && (
          <CollectionList
            title="Popular collections"
            collections={collections}
          />
        )}
        {posts.length > 0 && <PostList title="Latest Posts" posts={posts} />}
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const collections = await getCollections({limit: 6})
  const posts = getPosts({limit: 6})

  return {
    props: {collections, posts}
  }
}
