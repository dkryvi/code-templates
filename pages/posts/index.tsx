import {GetServerSideProps} from 'next'
import {NextSeo} from 'next-seo'
import Link from 'next/link'

import {getPostsWithAuthor} from 'api/post'
import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import Title from 'components/title'
import type {PostsWithAuthor} from 'domain/types'

type Props = {
  posts: PostsWithAuthor
  queryTag?: string
}

const PostsPage: React.FC<Props> = ({posts, queryTag}) => {
  return (
    <Layout>
      <NextSeo title="Posts | Code Templates" />
      <Container>
        <Title>{queryTag ? `#${queryTag} posts` : 'Posts'}</Title>
        {queryTag && (
          <Link href="/posts">
            <a
              className="prose mb-4 inline-block text-lg font-bold hover:underline"
              aria-label="View All"
            >
              View All
            </a>
          </Link>
        )}
        <PostList posts={posts} />
      </Container>
    </Layout>
  )
}

export default PostsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryTag = context.query?.tag as string

  const posts = await getPostsWithAuthor({
    where: {
      tags: {
        some: {
          slug: queryTag
        }
      }
    }
  })

  return {
    props: {posts, queryTag}
  }
}
