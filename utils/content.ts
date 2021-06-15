import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'
import util from 'util'
import {GetStaticPropsResult} from 'next'

export type TFileContent = {
  [key: string]: any
}

const readFile: (file: string) => Promise<string> = util.promisify(fs.readFile)

const readJSON = (file: string): Promise<TFileContent> =>
  new Promise((resolve) =>
    readFile(file).then((content: string) => resolve(JSON.parse(content)))
  )

export const getStaticPageProps = async (
  name: string
): Promise<GetStaticPropsResult<TFileContent>> => {
  const files = glob
    .sync(`.content/${name}/!(index).json`)
    .map((x: string) => path.resolve(x))

  const jsonData: Array<TFileContent> = await Promise.all(files.map(readJSON))
  const pageData = jsonData.reduce((acc, data) => {
    return {...data, ...acc}
  }, {})

  return {
    props: {
      ...pageData
    }
  }
}
