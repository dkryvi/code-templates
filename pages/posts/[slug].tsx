import {ParsedUrlQuery} from 'querystring'

import {Post} from '@prisma/client'
import {GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

import {getPostBySlug, getPosts, getPostsWithAuthor} from 'api/post'
import Container from 'components/container'
import Layout from 'components/layout'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import PostList from 'components/post-list'
import SocialMeta from 'components/social-meta'
import Title from 'components/title'
import type {PostsWithAuthor} from 'domain/types'
import {ShareIcon} from 'icons'
import {copyToClipboard} from 'utils/copy'
import markdownToHtml from 'utils/markdown-to-html'
import {toTitleCase} from 'utils/string'

interface Props {
  post: Post
  morePosts: PostsWithAuthor
}

const PostDetail: React.FC<Props> = ({post, morePosts}) => {
  const router = useRouter()

  const copyLink = () => {
    copyToClipboard(window.location.href)
    toast.success('Link copied to clipboard')
  }

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout>
        <Container>
          {router.isFallback ? (
            <Title>Loading…</Title>
          ) : (
            <>
              <SocialMeta
                title={`${toTitleCase(post.title)} | Code Templates`}
                description={post.excerpt}
                cardImage={post.imageUrl}
              />
              <article className="mx-auto mb-32 max-w-4xl">
                <PostHeader
                  title={post.title}
                  coverImage={post.imageUrl}
                  date={post.createdAt}
                />
                <PostBody content={post.content} />
              </article>
              {morePosts.length > 0 && (
                <PostList title="Similar Posts" posts={morePosts} />
              )}
            </>
          )}
        </Container>
      </Layout>
      <button
        className="fixed right-8 bottom-8 rounded-full bg-black p-4 text-white"
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
  const post = await getPostBySlug(slug)
  const content = await markdownToHtml(post?.content || '')
  const morePosts = await getPostsWithAuthor({
    take: 4,
    where: {
      slug: {
        not: post?.slug
      }
    }
  })

  return {
    props: {
      post: {
        ...post,
        content
      },
      morePosts
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts({select: {slug: true}})

  return {
    paths: posts.map((post) => `/posts/${post.slug}`),
    fallback: true
  }
}
