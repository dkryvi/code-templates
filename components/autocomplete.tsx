import {
  AutocompleteComponents,
  autocomplete,
  getAlgoliaResults
} from '@algolia/autocomplete-js'
import {Hit} from '@algolia/client-search'
import {RouterContext} from 'next/dist/shared/lib/router-context'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useEffect, createElement, Fragment} from 'react'
import {render} from 'react-dom'

import TagList from 'components/tag-list'
import algolia from 'lib/algolia'
import {AlgoliaPost} from 'types'

type PostHitT = Hit<AlgoliaPost>

type HitPropsT = {
  hit: PostHitT
  href: string
  components: AutocompleteComponents
}

const HitComponent: React.FC<HitPropsT> = ({hit, href, components}) => {
  return (
    <Link href={href}>
      <a>
        <div>
          <components.Highlight
            // @ts-ignore
            highlightProperty="_highlightResult"
            attribute="title"
            hit={hit}
          />
          <div className="mt-2">
            <TagList tags={hit.tags} />
          </div>
        </div>
      </a>
    </Link>
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
                <p className="prose prose-xl font-bold text-indigo-600">
                  Collections
                </p>
              ),
              item({item, components}) {
                return (
                  <RouterContext.Provider value={router}>
                    <HitComponent
                      hit={item}
                      href={`/collections/${item.slug}`}
                      components={components}
                    />
                  </RouterContext.Provider>
                )
              },
              noResults() {
                return 'No collections for this query.'
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
                <h4 className="prose prose-xl font-bold text-indigo-600">
                  Posts
                </h4>
              ),
              item({item, components}) {
                return (
                  <RouterContext.Provider value={router}>
                    <HitComponent
                      hit={item}
                      href={`/posts/${item.slug}`}
                      components={components}
                    />
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
