import {ParsedUrlQuery} from 'querystring'

import type {Tag} from '@prisma/client'
import {GetServerSideProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {useState} from 'react'

import {getCollectionWithTags} from 'api/collection'
import {getPostsWithAllRelative} from 'api/post'
import CollectionTagList from 'components/collection-tag-list'
import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import SocialMeta from 'components/social-meta'
import Title from 'components/title'
import type {CollectionWithTags, PostsWithAllRelative} from 'domain/types'

type Props = {
  collection: CollectionWithTags
  posts: PostsWithAllRelative
}

const CollectionDetail: React.FC<Props> = ({collection, posts}) => {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState<Tag | undefined>()

  const handleTagClick = (tag: Tag) =>
    setActiveTag(activeTag?.slug === tag.slug ? undefined : tag)

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!collection) {
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
        title={`${collection.title} | Code Templates`}
        description={collection.excerpt ?? collection.title}
        cardImage={collection.imageUrl}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug} = context.params as IParams

  const collection = await getCollectionWithTags({where: {slug}})
  const posts = await getPostsWithAllRelative({
    where: {collectionId: {equals: collection?.id}}
  })

  return {
    props: {
      collection,
      posts
    }
  }
}
