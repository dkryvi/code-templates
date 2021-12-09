import {ParsedUrlQuery} from 'querystring'

import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {useState} from 'react'

import {getCollections, getCollection} from 'api/collection'
import CollectionTagList from 'components/collection-tag-list'
import Container from 'components/container'
import Layout from 'components/layout'
import PostList from 'components/post-list'
import SocialMeta from 'components/social-meta'
import Title from 'components/title'
import {Collection, Post} from 'types'
import {getPostBySlug} from 'utils/fs'
import {toTitleCase} from 'utils/string'

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
        cardImage={collection.image}
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
  const collection = await getCollection(slug)

  const posts = collection
    ? collection.slugs.map((slug) => getPostBySlug(slug))
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
