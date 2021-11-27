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
