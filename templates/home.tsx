import Post from 'types/post'

import Container from 'components/container'
import MoreStories from 'components/more-stories'
import HeroPost from 'components/hero-post'
import Intro from 'components/intro'
import Layout from 'components/layout'

export type TProps = {
  posts: Post[]
}

const Index: React.FC<TProps> = ({posts}) => {
  const heroPost = posts[0]
  const morePosts = posts.slice(1)

  return (
    <Layout>
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
  )
}

export default Index
