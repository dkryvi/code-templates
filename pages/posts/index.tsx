import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {Post} from '@types'

import Container from '@components/container'
import Layout from '@components/layout'
import PostList from '@components/post-list'
import {getPosts} from '@lib/api'

type Props = {
  posts: Array<Post>
}

type RouterQuery = {
  [key: string]: string
}

const PostsPage: React.FC<Props> = ({posts}) => {
  const {query = {}} = useRouter()

  const {tag: queryTag} = query as RouterQuery

  const filteredPosts = queryTag
    ? posts.filter((post) => post.tags.includes(queryTag))
    : posts

  return (
    <Layout>
      <NextSeo title="Collections | Code Templates" />
      <Container>
        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8">
          {queryTag ? `#${queryTag} posts` : 'Posts'}
        </h1>
        {queryTag && (
          <Link href="/posts">
            <a
              className="inline-block text-lg font-bold mb-4 hover:underline"
              aria-label="View All"
            >
              View All
            </a>
          </Link>
        )}
        <PostList posts={filteredPosts} />
      </Container>
    </Layout>
  )
}

export default PostsPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts()

  return {
    props: {posts}
  }
}
