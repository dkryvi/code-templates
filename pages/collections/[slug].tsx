import {useState} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'

import Collection from 'types/collection'
import Post from 'types/post'
import {getCollections, getCollectionBySlug, getPostBySlug} from 'lib/api'

import CollectionTags from 'components/collection-tags'
import Container from 'components/container'
import Header from 'components/header'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import Title from 'components/title'

type Props = {
  collection: Collection
  posts: Array<Post>
}

const CollectionDetail: React.FC<Props> = ({collection, posts}) => {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState<string | undefined>()

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? undefined : tag)
  }

  if (!router.isFallback && !collection?.title) {
    return <ErrorPage statusCode={404} />
  }

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  return (
    <>
      <Head>
        <title>{collection.title} | Code Templates</title>
        <meta property="og:image" content={collection.coverImage} />
      </Head>
      <Layout>
        <Container>
          <Header />
          <article className="mb-32">
            <Title>{collection.title}</Title>
            <CollectionTags
              tags={collection.tags}
              activeTag={activeTag}
              onTagClick={handleTagClick}
            />
            <PostList posts={filteredPosts} />
          </article>
        </Container>
      </Layout>
    </>
  )
}

export default CollectionDetail

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as IParams
  const collection = await getCollectionBySlug(slug)

  const posts = collection
    ? await collection.slugs.map((slug) =>
        getPostBySlug(slug, [
          'title',
          'date',
          'slug',
          'author',
          'tags',
          'coverImage',
          'excerpt'
        ])
      )
    : []

  return {
    props: {
      collection,
      posts
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await getCollections()

  return {
    paths: collections.map((collection) => {
      return {
        params: {
          slug: collection.title
        }
      }
    }),
    fallback: false
  }
}
