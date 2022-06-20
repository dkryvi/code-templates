import {ParsedUrlQuery} from 'querystring'

import type {Tag} from '@prisma/client'
import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {useState} from 'react'

import {getCollections, getCollectionWithTags} from 'api/collection'
import {getPostsWithAllRelative} from 'api/post'
import CollectionTagList from 'components/collection-tag-list'
import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import SocialMeta from 'components/social-meta'
import Title from 'components/title'
import type {CollectionWithTags, PostsWithAllRelative} from 'domain/types'
import {toTitleCase} from 'utils/string'

type Props = {
  collection: CollectionWithTags
  posts: PostsWithAllRelative
}

const CollectionDetail: React.FC<Props> = ({collection, posts}) => {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState<Tag | undefined>()

  const handleTagClick = (tag: Tag) =>
    setActiveTag(activeTag?.slug === tag.slug ? undefined : tag)

  if (!router.isFallback || !collection?.title) {
    return <ErrorPage statusCode={404} />
  }

  const filteredPosts = activeTag
    ? posts.filter((post) =>
        post.tags?.some((tag) => tag.slug === activeTag?.slug)
      )
    : posts

  return (
    <>
      <SocialMeta
        title={`${toTitleCase(collection.title)} | Code Templates`}
        description={collection.excerpt ?? collection.title}
        cardImage={collection.imageUrl}
      />
      <Layout>
        <Container>
          <Title>{toTitleCase(collection.title)}</Title>
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

  const collection = await getCollectionWithTags({where: {slug}})
  const posts = getPostsWithAllRelative({
    where: {collectionId: {equals: collection?.id}}
  })

  return {
    props: {
      collection,
      posts
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await getCollections({select: {slug: true}})

  return {
    paths: collections.map(({slug}) => ({
      params: {slug}
    })),
    fallback: false
  }
}
