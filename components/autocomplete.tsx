import {useEffect, createElement, Fragment} from 'react'
import {render} from 'react-dom'
import {RouterContext} from 'next/dist/shared/lib/router-context'
import {useRouter} from 'next/router'
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
  return (
    <div>
      <components.Highlight
        // @ts-ignore
        highlightProperty="_highlightResult"
        attribute="title"
        hit={hit}
        tagName="b"
      />
      <div className="mt-2">
        <TagList tags={hit.tags} />
      </div>
    </div>
  )
}

type Props = {
  containerId: string
}

const Autocomplete: React.FC<Props> = ({containerId}) => {
  const router = useRouter()

  useEffect(() => {
    const search = autocomplete<PostHitT>({
      container: `#${containerId}`,
      renderer: {createElement, Fragment},
      render: ({children}: {children: any}, root) => render(children, root),
      placeholder: 'Search...',
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
            getItemUrl({item}) {
              return `/posts/${item.slug}`
            },
            templates: {
              item({item, components}) {
                return (
                  <RouterContext.Provider value={router}>
                    <HitComponent hit={item} components={components} />
                  </RouterContext.Provider>
                )
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
  }, [containerId, router])

  return <div id={containerId} className="w-full focus-within:shadow-md" />
}

export default Autocomplete
