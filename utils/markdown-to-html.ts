import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkPrism from 'remark-prism'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await unified()
    //@ts-ignore
    .use(remarkParse)
    .use(remarkPrism, {
      transformInlineCode: true,
      plugins: [
        'autolinker',
        'command-line',
        'data-uri-highlight',
        'diff-highlight',
        'inline-color',
        'keep-markup',
        'line-numbers',
        'show-invisibles',
        'treeview'
      ]
    })
    .use(remarkRehype)
    .use(rehypeFormat)
    //@ts-ignore
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}
