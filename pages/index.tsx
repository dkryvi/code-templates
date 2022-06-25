import {Collection} from '@prisma/client'
import {GetServerSideProps} from 'next'

import {getCollections} from 'api/collection'
import {getPostsWithAuthor} from 'api/post'
import CollectionList from 'components/collection-list'
import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import type {PostsWithAuthor} from 'domain/types'

type Props = {
  collections: Array<Collection>
  posts: PostsWithAuthor
}

const HomePage: React.FC<Props> = ({collections, posts}) => {
  return (
    <Layout>
      <Container>
        <h1 className="mb-16 text-6xl font-bold leading-tight tracking-tighter text-gray-900 md:pr-8 md:text-8xl">
          Code Templates.
        </h1>
        <CollectionList title="Popular collections" collections={collections} />
        <PostList title="Latest Posts" posts={posts} allLink="/posts" />
      </Container>
    </Layout>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {
  const collections = await getCollections({
    take: 6,
    orderBy: {
      posts: {
        _count: 'desc'
      }
    }
  })
  const posts = await getPostsWithAuthor({take: 6})

  return {
    props: {collections, posts}
  }
}
