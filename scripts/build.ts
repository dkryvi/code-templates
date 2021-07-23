import {getPosts} from '../lib/api'
import {buildSearch} from './build-search'
import {buildCollections} from './build-collections'

async function build() {
  const posts = getPosts()

  await buildSearch({posts})
  console.log('Successfully build search settings')
  await buildCollections({posts})
  console.log('Successfully build collections')
  console.log('!!!Finished all build stages!!!')
}

try {
  build()
} catch (error) {
  console.error('Error happened during the build: ' + error)
}
