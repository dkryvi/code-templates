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
        <div className="mb-16 flex-column lg:items-center justify-center">
          <h1 className="prose text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 text-center">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">
              Best place to store your templates
            </span>
          </h1>
          <div className="mt-8 flex flex-col space-y-6 sm:space-x-6 sm:space-y-0 sm:flex-row justify-center">
            <Link href="/create-post">
              <a className="btn btn-primary text-2xl text-center">
                Get started
              </a>
            </Link>
            <Link href="/about">
              <a className="btn btn-outline text-2xl text-center">Learn more</a>
            </Link>
          </div>
        </div>
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
