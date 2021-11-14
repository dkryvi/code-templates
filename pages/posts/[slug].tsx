import {ParsedUrlQuery} from 'querystring'

import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'

import {getPost, getPosts} from '@api'
import {ShareIcon} from '@icons'
import {ExtendedPost, PostWithAuthor} from '@types'

import Container from '@components/container'
import Content from '@components/content'
import Layout from '@components/layout'
import PostHeader from '@components/post-header'
import PostList from '@components/post-list'
import SocialMeta from '@components/social-meta'
import Title from '@components/title'
import {copyToClipboard} from '@utils/content'
import {toTitleCase} from '@utils/string'

interface Props {
  post: ExtendedPost
  similarPosts: Array<PostWithAuthor>
}

const PostDetail: React.FC<Props> = ({post, similarPosts}) => {
  const router = useRouter()

  const copyLink = () => {
    copyToClipboard(window.location.href)
    alert('Link copied to clipboard')
  }

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout>
        <SocialMeta
          title={`${toTitleCase(post.title)} | Code Templates`}
          description={post.excerpt}
          cardImage={post.ogImage.url}
        />
        <Container>
          {router.isFallback ? (
            <Title>Loading…</Title>
          ) : (
            <article className="mb-32">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.createdAt.toLocaleString()}
                author={post.author}
                tags={post.tags}
              />
              <Content content={post.content} />
            </article>
          )}
          {similarPosts.length > 0 && (
            <PostList title="Similar Posts" posts={similarPosts} />
          )}
        </Container>
      </Layout>
      <button
        className="fixed right-8 bottom-8 p-4 rounded-full bg-black text-white"
        onClick={copyLink}
      >
        <ShareIcon className="fill-current text-white" />
      </button>
    </>
  )
}

export default PostDetail

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as IParams
  const post = await getPost({
    where: {slug},
    include: {author: true, ogImage: true}
  })
  const similarPosts = await getPosts({
    take: 4,
    where: {
      tags: {hasSome: post?.tags},
      slug: {notIn: post?.slug ? [post?.slug] : undefined}
    },
    include: {author: true}
  })

  return {
    props: {
      post,
      similarPosts
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({
    select: {
      slug: true
    }
  })

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
