import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import Link from 'next/link'

import {getPosts} from 'lib/api'
import Post from 'types/post'

import Container from 'components/container'
import Header from 'components/header'
import PostList from 'components/post-list'
import Layout from 'components/layout'

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
      <Container>
        <Header />
        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8">
          {queryTag ? `#${queryTag} posts` : 'Posts'}
        </h1>
        {queryTag && (
          <Link href="/posts">
            <a
              className="inline-block text-lg font-bold mb-4"
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
