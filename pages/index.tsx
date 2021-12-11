import {GetStaticProps} from 'next'
import Link from 'next/link'

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
        <div className="mb-16 flex flex-col items-center">
          <h1 className="prose text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 text-center">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">
              Best place to store your templates
            </span>
          </h1>
          <Link href="/get-started">
            <a
              className="mt-8 btn btn-primary text-2xl text-center"
              aria-label="get-started"
            >
              Get started
            </a>
          </Link>
        </div>
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
