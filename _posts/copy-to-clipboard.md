---
title: 'Copy to clipboard'
excerpt: 'Code snippet to copy some value into the buffer'
tags: ['javascript', 'snippet', 'copy-to-clipboard']
---

```js
function copyToClipboard(link) {
  const textarea = document.createElement('textarea')
  textarea.textContent = link
  document.body.appendChild(textarea)

  const selection = document.getSelection()
  const range = document.createRange()

  range.selectNode(textarea)
  selection.removeAllRanges()
  selection.addRange(range)

  document.execCommand('copy')
  selection.removeAllRanges()

  document.body.removeChild(textarea)
}
```
