import fs from 'fs-extra'
import logger from 'loglevel'

import {getPosts} from '../api'
import {CONTENT_FOLDER} from '../constants'
import {Post} from '../types'
import {serializeToFile, getSettings} from '../utils/fs'

type GroupedPosts = {
  [key: string]: Array<Post>
}

function groupPostsByPrimaryTag(posts: Array<Post>): GroupedPosts {
  return posts.reduce((res: GroupedPosts, post: Post) => {
    const primaryTag = post.tags[0]

    if (res[primaryTag]) {
      return {
        ...res,
        [primaryTag]: [...res[primaryTag], post]
      }
    }

    return {
      ...res,
      [primaryTag]: [post]
    }
  }, {})
}

function getUniquePostsTags(posts: Array<Post>): Array<string> {
  const allTags = posts
    .reduce((res: Array<string>, post: Post) => [...res, post.tags[1]], [])
    .filter(Boolean)

  return [...Array.from(new Set(allTags))]
}

async function build() {
  logger.setLevel('info')
  const contentOutputPath = `${process.cwd()}/${CONTENT_FOLDER}`

  fs.ensureDirSync(contentOutputPath)

  const posts = getPosts()
  const groupedPosts = groupPostsByPrimaryTag(posts)

  const collectionsDictionary = await getSettings('collections')
  const collections = Object.keys(groupedPosts).map((title) => ({
    title,
    excerpt: collectionsDictionary[title]?.excerpt,
    coverImage: collectionsDictionary[title]?.coverImage,
    tags: getUniquePostsTags(groupedPosts[title]),
    slugs: groupedPosts[title].map((post) => post.slug)
  }))

  await serializeToFile(`${contentOutputPath}/collections.json`, collections, {
    flag: 'w+'
  })

  logger.info(`🎉 Successfully build ${collections.length} collections`)
}

build()
