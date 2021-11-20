import {Collection} from '@prisma/client'
import {GetStaticProps} from 'next'
import Link from 'next/link'

import {getPosts, getCollections} from '@api'
import {PostWithAuthor} from '@types'

import CollectionList from '@components/collection-list'
import Container from '@components/container'
import Layout from '@components/layout'
import PostList from '@components/post-list'

type Props = {
  collections: Array<Collection>
  posts: Array<PostWithAuthor>
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
          <Link href="/create-post">
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
