import {buildSearch} from './build-search'
import {buildCollections} from './build-collections'

async function build() {
  await buildSearch()
  console.log('Successfully finished syncing search settings')
  await buildCollections()
  console.log('Successfully build collections')
  console.log('!!!Finished all build stages!!!')
}

try {
  build()
} catch (error) {
  console.error('Error happened during the build: ' + error)
}
