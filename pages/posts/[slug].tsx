import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'

import {getPostBySlug, getPosts} from 'lib/api'
import markdownToHtml from 'lib/utils/markdown-to-html'
import PostType from 'types/post'
import copyToClipboard from 'lib/utils/copy-to-clipboard'
import {ShareIcon} from 'icons'

import Container from 'components/container'
import PostBody from 'components/post-body'
import Header from 'components/header'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import Title from 'components/title'

type Props = {
  post: PostType
  similarPosts: Array<PostType>
}

const Post: React.FC<Props> = ({post, similarPosts}) => {
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
        <Container>
          <Header />
          {router.isFallback ? (
            <Title>Loading…</Title>
          ) : (
            <>
              <article className="mb-32">
                <Head>
                  <title>{post.title} | Code Templates</title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  tags={post.tags}
                />
                <PostBody content={post.content} />
              </article>
            </>
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
        <ShareIcon className="text-white" />
      </button>
    </>
  )
}

export default Post

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as IParams
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'tags'
  ])
  const content = await markdownToHtml(post.content || '')
  const similarPosts = getPosts({
    limit: 6,
    tags: post.tags,
    excludedSlugs: [post.slug]
  })

  return {
    props: {
      post: {
        ...post,
        content
      },
      similarPosts
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts({fields: ['slug']})

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
