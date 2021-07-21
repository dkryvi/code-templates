import {GetStaticProps} from 'next'

import {getPosts} from 'lib/api'
import Post from 'types/post'

import Container from 'components/container'
import PostList from 'components/post-list'
import AppBar from 'components/app-bar'
import Layout from 'components/layout'

type Props = {
  posts: Post[]
}

const Index: React.FC<Props> = ({posts}) => {
  return (
    <Layout>
      <Container>
        <AppBar />
        {posts.length > 0 && <PostList title="Latest Posts" posts={posts} />}
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts({limit: 6})

  return {
    props: {posts}
  }
}
