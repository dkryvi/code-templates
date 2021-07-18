import {useEffect, createElement, Fragment} from 'react'
import {render} from 'react-dom'

import Link from 'next/link'
import algoliasearch from 'algoliasearch'
import {Hit} from '@algolia/client-search'
import {
  AutocompleteComponents,
  autocomplete,
  getAlgoliaResults
} from '@algolia/autocomplete-js'

import TagList from 'components/tag-list'
import Post from 'types/post'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
const searchClient = algoliasearch(appId, apiKey)

type PostHitT = Hit<Post>

type HitPropsT = {
  hit: PostHitT
  components: AutocompleteComponents
}

const HitComponent: React.FC<HitPropsT> = ({hit, components}) => {
  const {Highlight} = components

  return (
    <Link href={`/posts/${hit.slug}`}>
      <a className="hover:bg-gray-100" aria-label={hit.title}>
        <Highlight
          // @ts-ignore
          highlightProperty="_highlightResult"
          attribute="title"
          hit={hit}
          tagName="b"
        />
        <div className="mt-2">
          <TagList tags={hit.tags} />
        </div>
      </a>
    </Link>
  )
}

const Autocomplete: React.FC = () => {
  useEffect(() => {
    const search = autocomplete<PostHitT>({
      container: '#autocomplete',
      renderer: {createElement, Fragment},
      render: ({children}: {children: any}, root) => render(children, root),
      placeholder: 'Search...',
      debug: true,
      openOnFocus: true,
      getSources: ({query}) => {
        if (!query) {
          return []
        }

        return [
          {
            sourceId: 'posts',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'blog_posts',
                    query
                  }
                ]
              })
            },
            templates: {
              item({item, components}) {
                return <HitComponent hit={item} components={components} />
              },
              noResults() {
                return 'No posts for this query.'
              }
            }
          }
        ]
      }
    })

    return () => {
      search.destroy()
    }
  }, [])

  return <div id="autocomplete" />
}

export default Autocomplete
