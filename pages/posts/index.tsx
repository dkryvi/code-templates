import {GetStaticProps} from 'next'

import {getPosts} from 'lib/api'
import Post from 'types/post'

import Container from 'components/container'
import Header from 'components/header'
import PostList from 'components/post-list'
import Layout from 'components/layout'

type Props = {
  posts: Array<Post>
}

const Index: React.FC<Props> = ({posts}) => {
  return (
    <Layout>
      <Container>
        <Header />
        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8">
          Posts
        </h1>
        <PostList posts={posts} />
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts()

  return {
    props: {posts}
  }
}
