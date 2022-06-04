import {GetStaticProps} from 'next'

import {getCollections} from 'api/collection'
import CollectionList from 'components/collection-list'
import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import {Collection, Post} from 'types'
import {getPosts} from 'utils/fs'

type Props = {
  collections: Array<Collection>
  posts: Array<Post>
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

export const getStaticProps: GetStaticProps = async () => {
  const collections = await getCollections({
    page_size: 6,
    sorts: [{property: 'slugs', direction: 'descending'}]
  })
  const posts = getPosts({limit: 6})

  return {
    props: {collections, posts}
  }
}
