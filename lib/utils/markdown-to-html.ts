import {remark} from 'remark'
import html from 'remark-html'
import parse from 'remark-parse'
import prism from 'remark-prism'
import stringify from 'remark-stringify'

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark()
    .use(parse)
    .use(stringify)
    .use(prism, {
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
    .use(html)
    .process(markdown)
  console.log({result})

  return result.toString()
}
