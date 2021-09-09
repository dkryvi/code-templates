import {ParsedUrlQuery} from 'querystring'

import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'

import {ShareIcon} from '@icons'
import {Post} from '@types'

import Container from '@components/container'
import Layout from '@components/layout'
import PostBody from '@components/post-body'
import PostHeader from '@components/post-header'
import PostList from '@components/post-list'
import SocialMeta from '@components/social-meta'
import Title from '@components/title'
import {getPostBySlug, getPosts} from '@lib/api'
import copyToClipboard from '@lib/utils/copy-to-clipboard'
import markdownToHtml from '@lib/utils/markdown-to-html'
import toTitleCase from '@lib/utils/to-title-case'

type Props = {
  post: Post
  similarPosts: Array<Post>
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
                date={post.date}
                author={post.author}
                tags={post.tags}
              />
              <PostBody content={post.content} />
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
  const post = getPostBySlug(slug, [
    'title',
    'excerpt',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'tags',
    'ogImage'
  ])
  const content = await markdownToHtml(post.content || '')
  const similarPosts = getPosts({
    limit: 4,
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
