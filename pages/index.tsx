import {Collection, Post} from '@prisma/client'
import {GetStaticProps} from 'next'

import {getPosts, getCollections} from '@api'

import CollectionList from '@components/collection-list'
import Container from '@components/container'
import Layout from '@components/layout'
import PostList from '@components/post-list'

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
  const collections = await getCollections({
    take: 6,
    orderBy: {
      slugs: 'desc'
    }
  })
  const posts = await getPosts({
    take: 6,
    include: {author: true}
  })

  return {
    props: {collections, posts}
  }
}
