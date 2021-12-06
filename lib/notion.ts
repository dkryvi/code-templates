import {Client, LogLevel} from '@notionhq/client'

declare global {
  // eslint-disable-next-line no-var
  var notion: Client | undefined
}

const notion =
  global.notion ||
  new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
    logLevel: LogLevel.DEBUG
  })

if (process.env.NODE_ENV !== 'production') {
  global.notion = notion
}

export default notion
