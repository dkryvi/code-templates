import Head from 'next/head'

import {getAllPosts} from 'lib/api'
import {CMS_NAME} from 'lib/constants'
import Post from 'types/post'

import Container from 'components/container'
import MoreStories from 'components/more-stories'
import HeroPost from 'components/hero-post'
import Intro from 'components/intro'
import Layout from 'components/layout'

type Props = {
  allPosts: Post[]
}

const Index = ({allPosts}: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              tags={heroPost.tags}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'tags',
    'coverImage',
    'excerpt'
  ])

  return {
    props: {allPosts}
  }
}
