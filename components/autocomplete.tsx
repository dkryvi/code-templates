import {
  AutocompleteComponents,
  autocomplete,
  getAlgoliaResults
} from '@algolia/autocomplete-js'
import {Hit} from '@algolia/client-search'
import {RouterContext} from 'next/dist/shared/lib/router-context'
import {useRouter} from 'next/router'
import {useEffect, createElement, Fragment} from 'react'
import {render} from 'react-dom'

import TagList from 'components/tag-list'
import algolia from 'lib/algolia'
import {AlgoliaPost} from 'types'

type PostHitT = Hit<AlgoliaPost>

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

const Autocomplete: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const search = autocomplete<PostHitT>({
      container: '#autocomplete',
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
            sourceId: 'collections',
            getItems() {
              return getAlgoliaResults({
                searchClient: algolia,
                queries: [{indexName: 'collections', query}]
              })
            },
            getItemUrl({item}) {
              return `/collections/${item.slug}`
            },
            templates: {
              header: () => (
                <p className="prose text-indigo-600 font-bold">Collections</p>
              ),
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
          },
          {
            sourceId: 'posts',
            getItems() {
              return getAlgoliaResults({
                searchClient: algolia,
                queries: [{indexName: 'posts', query}]
              })
            },
            getItemUrl({item}) {
              return `/posts/${item.slug}`
            },
            templates: {
              header: () => (
                <p className="prose text-indigo-600 font-bold">Posts</p>
              ),
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
  }, [router])

  return <div id="autocomplete" className="w-full focus-within:shadow-md" />
}

export default Autocomplete
