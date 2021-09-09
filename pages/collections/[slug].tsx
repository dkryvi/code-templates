import {ParsedUrlQuery} from 'querystring'

import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {useState} from 'react'

import {Collection} from '@types'
import {Post} from '@types'

import CollectionTagList from '@components/collection-tag-list'
import Container from '@components/container'
import Layout from '@components/layout'
import PostList from '@components/post-list'
import SocialMeta from '@components/social-meta'
import Title from '@components/title'
import {getCollections, getCollectionBySlug, getPostBySlug} from '@lib/api'
import {COLLECTION_IMAGE_FALLBACK} from '@lib/constants'
import toTitleCase from '@lib/utils/to-title-case'

type Props = {
  collection: Collection
  posts: Array<Post>
}

const CollectionDetail: React.FC<Props> = ({collection, posts}) => {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState<string | undefined>()

  const handleTagClick = (tag: string) =>
    setActiveTag(activeTag === tag ? undefined : tag)

  if (!router.isFallback && !collection?.title) {
    return <ErrorPage statusCode={404} />
  }

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  return (
    <>
      <SocialMeta
        title={`${toTitleCase(collection.title)} | Code Templates`}
        description={collection.excerpt ?? collection.title}
        cardImage={collection.coverImage ?? COLLECTION_IMAGE_FALLBACK}
      />
      <Layout>
        <Container>
          <Title>{collection.title}</Title>
          <CollectionTagList
            tags={collection.tags}
            activeTag={activeTag}
            onTagClick={handleTagClick}
          />
          <PostList posts={filteredPosts} />
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
