import algoliasearch from 'algoliasearch'
import type {SearchClient} from 'algoliasearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string

declare global {
  // eslint-disable-next-line no-var
  var algolia: SearchClient | undefined
}

const algolia = global.algolia || algoliasearch(appId, apiKey)

if (process.env.NODE_ENV !== 'production') {
  global.algolia = algolia
}

export default algolia
