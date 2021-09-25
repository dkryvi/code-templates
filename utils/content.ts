import format from 'rehype-format'
import stringify from 'rehype-stringify'
import parse from 'remark-parse'
import prism from 'remark-prism'
import rehype from 'remark-rehype'
import {unified} from 'unified'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(parse)
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
    .use(rehype)
    .use(format)
    .use(stringify)
    .process(markdown)

  return result.toString()
}

export function copyToClipboard(link: string): void {
  const textarea = document.createElement('textarea')
  textarea.textContent = link
  document.body.appendChild(textarea)

  const selection = document.getSelection()
  const range = document.createRange()

  if (selection) {
    range.selectNode(textarea)
    selection.removeAllRanges()
    selection.addRange(range)

    document.execCommand('copy')
    selection.removeAllRanges()

    document.body.removeChild(textarea)
  }
}
