import {ParsedUrlQuery} from 'querystring'

import {Collection} from '@prisma/client'
import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {useState} from 'react'

import {getCollections, getCollection, getPost} from '@api'
import {COLLECTION_IMAGE_FALLBACK} from '@constants'
import {PostWithAuthor} from '@types'

import CollectionTagList from '@components/collection-tag-list'
import Container from '@components/container'
import Layout from '@components/layout'
import PostList from '@components/post-list'
import SocialMeta from '@components/social-meta'
import Title from '@components/title'
import {toTitleCase} from '@utils/string'

type Props = {
  collection: Collection
  posts: Array<PostWithAuthor>
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
  const collection = await getCollection({
    where: {title: slug}
  })

  const posts = collection
    ? await Promise.all(
        collection.slugs.map((slug) =>
          getPost({
            where: {slug},
            include: {author: true}
          })
        )
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
  const collections = await getCollections({select: {title: true}})

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
