import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import Title from 'components/title'
import {Post} from 'types'
import {getPosts} from 'utils/fs'

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
      <NextSeo title="Posts | Code Templates" />
      <Container>
        <Title>{queryTag ? `#${queryTag} posts` : 'Posts'}</Title>
        {queryTag && (
          <Link href="/posts">
            <a
              className="prose inline-block text-lg font-bold mb-4 hover:underline"
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

export const getStaticProps: GetStaticProps = () => {
  const posts = getPosts()

  return {
    props: {posts}
  }
}
