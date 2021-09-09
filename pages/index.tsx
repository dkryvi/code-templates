import {GetStaticProps} from 'next'

import {Collection} from '@types'
import {Post} from '@types'

import CollectionList from '@components/collection-list'
import Container from '@components/container'
import Layout from '@components/layout'
import PostList from '@components/post-list'
import {getPosts, getCollections} from '@lib/api'

type Props = {
  collections: Array<Collection>
  posts: Array<Post>
}

const HomePage: React.FC<Props> = ({collections, posts}) => {
  return (
    <Layout>
      <Container>
        {collections.length > 0 && (
          <CollectionList
            title="Popular collections"
            collections={collections}
          />
        )}
        {posts.length > 0 && (
          <PostList title="Latest Posts" posts={posts} allLink="/posts" />
        )}
      </Container>
    </Layout>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const collections = await getCollections({limit: 6})
  const posts = getPosts({limit: 6})

  return {
    props: {collections, posts}
  }
}
