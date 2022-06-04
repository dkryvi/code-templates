import {ParsedUrlQuery} from 'querystring'

import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

import Container from 'components/container'
import Layout from 'components/layout'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import PostList from 'components/post-list'
import SocialMeta from 'components/social-meta'
import Title from 'components/title'
import {ShareIcon} from 'icons'
import {Post} from 'types'
import {copyToClipboard} from 'utils/copy'
import {getPostBySlug, getPosts} from 'utils/fs'
import markdownToHtml from 'utils/markdown-to-html'
import {toTitleCase} from 'utils/string'

interface Props {
  post: Post
  morePosts: Array<Post>
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
                cardImage={post.ogImage}
              />
              <article className="mx-auto mb-32 max-w-4xl">
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
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
  const post = getPostBySlug(slug)
  const content = await markdownToHtml(post?.content || '')
  const morePosts = getPosts({limit: 4, excludedSlugs: [post.slug]})

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

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getPosts()

  return {
    paths: posts.map((post) => `/posts/${post.slug}`),
    fallback: true
  }
}
